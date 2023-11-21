from rest_framework.permissions import BasePermission
from accounts.models import Mentors

class isMentor(BasePermission):
    def has_permission(self, request, view):
        try:
           Mentors.objects.get(user=request.user)
        except Mentors.DoesNotExist:
            return False
        return True
