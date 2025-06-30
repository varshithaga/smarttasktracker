from rest_framework.permissions import BasePermission, SAFE_METHODS


class IsRoleAdmin(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'admin'

class IsContributor(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated and request.user.role == 'contributor'

class IsAdminOrReadOnly(BasePermission):
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return request.user.is_authenticated and request.user.role == 'admin'
