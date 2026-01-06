from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions,viewsets, generics
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import  User, Department,Designation,BranchState,BranchLocation,SubLocation, Pincode,BranchInnerState, BranchInnerLocation , Bank, TypeOfAccount
from .serializers import UserSerializer,DepartmentSerializer,DesignationSerializer,BranchStateSerializer,BranchLocationSerializer,SubLocationSerializer, PincodeSerializer,BranchInnerStateSerializer, BranchInnerLocationSerializer , BankSerializer, TypeOfAccountSerializer
from .permissions import IsTrainer, IsTrainee


#here im defining the views
from rest_framework.viewsets import ModelViewSet

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




# --------------------------------------------------------------------------


class DepartmentViewSet(ModelViewSet):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer



class DesignationViewSet(ModelViewSet):
    queryset = Designation.objects.all()
    serializer_class = DesignationSerializer
    permission_classes = [permissions.AllowAny]  # Allow public access for now
    
    def create(self, request, *args, **kwargs):
        """Override create to handle any serialization errors gracefully"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": str(e), "detail": "Error creating designation"},
                status=status.HTTP_400_BAD_REQUEST
            )


class BranchStateViewSet(ModelViewSet):
    queryset = BranchState.objects.all()
    serializer_class = BranchStateSerializer
    permission_classes = [permissions.AllowAny]


class BranchLocationViewSet(ModelViewSet):
    queryset = BranchLocation.objects.all()
    serializer_class = BranchLocationSerializer
    permission_classes = [permissions.AllowAny]
    
    def create(self, request, *args, **kwargs):
        """Override create to handle any serialization errors gracefully"""
        try:
            return super().create(request, *args, **kwargs)
        except Exception as e:
            return Response(
                {"error": str(e), "detail": "Error creating branch location"},
                status=status.HTTP_400_BAD_REQUEST
            )


#-------------------------------------------------------------------------------#

# SubLocation ViewSet

class SubLocationViewSet(viewsets.ModelViewSet):
    queryset = SubLocation.objects.all()
    serializer_class = SubLocationSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment if you need authentication
    
    def get_queryset(self):
        queryset = SubLocation.objects.all()
        
        # Filter by branch_state if provided
        branch_state = self.request.query_params.get('branch_state')
        if branch_state:
            queryset = queryset.filter(branch_state=branch_state)
        
        # Filter by branch_location if provided
        branch_location = self.request.query_params.get('branch_location')
        if branch_location:
            queryset = queryset.filter(branch_location=branch_location)
        
        # Filter by status if provided
        status = self.request.query_params.get('status')
        if status is not None:
            queryset = queryset.filter(status=status)
        
        return queryset

# Additional view for getting sublocations by location
class SubLocationByLocationView(generics.ListAPIView):
    serializer_class = SubLocationSerializer
    # permission_classes = [IsAuthenticated]  # Uncomment if you need authentication
    
    def get_queryset(self):
        location_id = self.kwargs['location_id']
        return SubLocation.objects.filter(branch_location=location_id, status=True)


class BranchInnerStateViewSet(ModelViewSet):
    queryset = BranchInnerState.objects.all()
    serializer_class = BranchInnerStateSerializer


class BranchInnerLocationViewSet(ModelViewSet):
    queryset = BranchInnerLocation.objects.all()
    serializer_class = BranchInnerLocationSerializer

    def get_queryset(self):
        queryset = BranchInnerLocation.objects.all()
        branch_inner_state = self.request.query_params.get('branch_inner_state')
        branch_location = self.request.query_params.get('branch_location')
        status = self.request.query_params.get('status')

        if branch_inner_state:
            queryset = queryset.filter(branch_inner_state=branch_inner_state)
        if branch_location:
            queryset = queryset.filter(branch_location=branch_location)
        if status is not None:
            queryset = queryset.filter(status=status)

        return queryset


# Pincode ViewSet
class PincodeViewSet(viewsets.ModelViewSet):
    queryset = Pincode.objects.all()
    serializer_class = PincodeSerializer

    def get_queryset(self):
        queryset = Pincode.objects.all()
        branch_state = self.request.query_params.get('branch_state')
        branch_location = self.request.query_params.get('branch_location')
        sub_location = self.request.query_params.get('sub_location')
        status = self.request.query_params.get('status')

        if branch_state:
            queryset = queryset.filter(branch_state=branch_state)
        if branch_location:
            queryset = queryset.filter(branch_location=branch_location)
        if sub_location:
            queryset = queryset.filter(sub_location=sub_location)
        if status is not None:
            queryset = queryset.filter(status=status)

        return queryset




class BranchInnerStateViewSet(ModelViewSet):
    queryset = BranchInnerState.objects.all()
    serializer_class = BranchInnerStateSerializer







class BankViewSet(ModelViewSet):
    queryset = Bank.objects.filter(status=True)
    serializer_class = BankSerializer


class TypeOfAccountViewSet(ModelViewSet):
    queryset = TypeOfAccount.objects.filter(status=True)
    serializer_class = TypeOfAccountSerializer