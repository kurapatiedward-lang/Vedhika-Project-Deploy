from django.urls import path
from .views import LoginView, UserManagementView , TrainerOnlyView, TraineeOnlyView

urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("users/", UserManagementView.as_view(), name="users"),           # GET, POST
    path("users/<int:pk>/", UserManagementView.as_view(), name="user-crud"),  # PUT, DELETE
    path("trainer-only/", TrainerOnlyView.as_view(), name="trainer-only"),
    path("trainee-only/", TraineeOnlyView.as_view(), name="trainee-only"),
]
