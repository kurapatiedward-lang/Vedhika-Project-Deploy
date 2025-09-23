from rest_framework.permissions import BasePermission

class IsTrainer(BasePermission):
    """
    Allows access only to users with role 'trainer'
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == "trainer"


class IsTrainee(BasePermission):
    """
    Allows access only to users with role 'trainee'
    """
    def has_permission(self, request, view):
        return request.user and request.user.role == "trainee"
