from rest_framework import viewsets, status, permissions
from rest_framework.response import Response

from .models import TraineeQuestion
from .serializers import TraineeQuestionSerializer

class TraineeQuestionViewSet(viewsets.ModelViewSet):
    queryset = TraineeQuestion.objects.all()
    serializer_class = TraineeQuestionSerializer
    permission_classes = [
        permissions.IsAuthenticated
        ]
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)
