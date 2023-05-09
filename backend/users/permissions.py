from rest_framework import permissions
from .models import Role

class IsAdminUser(permissions.BasePermission):
    """
    Permission class that only allows access to users with the role of administrator
    """
    
    def has_permission(self, request, view):
        return Role.objects.get(user=request.user).name == Role.ADMINISTRATOR