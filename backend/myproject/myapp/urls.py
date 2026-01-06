from django.urls import path,include
from .views import LoginView, UserManagementView , TrainerOnlyView, TraineeOnlyView  ,DepartmentViewSet ,DesignationViewSet ,BranchStateViewSet ,BranchLocationViewSet,SubLocationViewSet, PincodeViewSet, BranchInnerStateViewSet, BranchInnerLocationViewSet, BankViewSet,TypeOfAccountViewSet
from rest_framework.routers import DefaultRouter




router = DefaultRouter()
router.register(r'departments', DepartmentViewSet)
router.register(r'designations', DesignationViewSet)    
router.register(r'branch-states', BranchStateViewSet)    
router.register(r'branch-locations',BranchLocationViewSet)    
router.register(r'sublocations', SubLocationViewSet)  
router.register(r'pincodes', PincodeViewSet)
router.register(r'branch-inner-states', BranchInnerStateViewSet)
router.register(r'branch-inner-locations', BranchInnerLocationViewSet)
router.register(r'banks', BankViewSet)
router.register(r'typeofaccounts', TypeOfAccountViewSet)





urlpatterns = [
    path("login/", LoginView.as_view(), name="login"),
    path("users/", UserManagementView.as_view(), name="users"),           # GET, POST
    path("users/<int:pk>/", UserManagementView.as_view(), name="user-crud"),  # PUT, DELETE
    path("trainer-only/", TrainerOnlyView.as_view(), name="trainer-only"),
    path("trainee-only/", TraineeOnlyView.as_view(), name="trainee-only"),
    path('', include(router.urls)),
]
