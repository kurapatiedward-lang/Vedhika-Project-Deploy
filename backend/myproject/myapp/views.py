from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import User
from .serializers import UserSerializer
from .permissions import IsTrainer, IsTrainee

# Utility: generate JWT tokens
def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
        'role': user.role
    }

# 🔹 Login View
class LoginView(APIView):
    def post(self, request):
        email = request.data.get("email")
        password = request.data.get("password")

        # First check: Admin superuser
        try:
            admin_user = User.objects.get(email=email, is_superuser=True)
            if admin_user.check_password(password):
                tokens = get_tokens_for_user(admin_user)
                return Response(tokens, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            pass

        # Next check: Trainer/Trainee
        user = authenticate(request, email=email, password=password)
        if user:
            tokens = get_tokens_for_user(user)
            return Response(tokens, status=status.HTTP_200_OK)

        return Response({"error": "Invalid credentials"}, status=status.HTTP_401_UNAUTHORIZED)


# 🔹 Admin-only CRUD for Trainers & Trainees
class UserManagementView(APIView):
    permission_classes = [permissions.IsAuthenticated, permissions.IsAdminUser]

    # GET → List all non-admin users
    def get(self, request):
        users = User.objects.exclude(role='admin')
        serializer = UserSerializer(users, many=True)
        return Response(serializer.data)

    # POST → Create Trainer/Trainee
    def post(self, request):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(
                email=serializer.validated_data['email'],
                full_name=serializer.validated_data.get('full_name', ''),
                role=serializer.validated_data.get('role', 'trainee'),
                contact_info=serializer.validated_data.get('contact_info'),
                password=request.data.get('password')
            )
            return Response(UserSerializer(user).data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # PUT → Update user by ID
    def put(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            # Optional: allow password change
            password = request.data.get('password')
            if password:
                user.set_password(password)
            serializer.save()
            user.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # DELETE → Delete user by ID
    def delete(self, request, pk):
        try:
            user = User.objects.get(pk=pk)
            user.delete()
            return Response({"message": "User deleted"}, status=status.HTTP_200_OK)
        except User.DoesNotExist:
            return Response({"error": "User not found"}, status=status.HTTP_404_NOT_FOUND)


# 🔹 Trainer-only API example
class TrainerOnlyView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTrainer]

    def get(self, request):
        return Response({"message": f"Hello Trainer {request.user.full_name}!"})


# 🔹 Trainee-only API example
class TraineeOnlyView(APIView):
    permission_classes = [permissions.IsAuthenticated, IsTrainee]

    def get(self, request):
        return Response({"message": f"Hello Trainee {request.user.full_name}!"})
