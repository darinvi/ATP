from rest_framework import viewsets, permissions
from .serializers import FilingSerializer
from .models import Filing

class FilingViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]

    serializer_class = FilingSerializer
    
    def get_queryset(self):
        return Filing.objects.all()
