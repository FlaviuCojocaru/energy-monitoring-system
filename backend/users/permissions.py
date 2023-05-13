from rest_framework import permissions
from .models import Role


class IsAdminUser(permissions.BasePermission):
    """
    Permission class that only allows access to users with the role of administrator
    """

    def has_permission(self, request, view):
        return Role.objects.get(user=request.user).name == Role.ADMINISTRATOR


class IsAdminOrReadOnly(permissions.BasePermission):
    """
    Permission class that only allows access to admin users for non-safe (non-read) methods.
    """

    def has_permission(self, request, view):
        if request.method == 'GET':
            return True
        
        return request.user.role.name == Role.ADMINISTRATOR