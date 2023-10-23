from rest_framework import viewsets, status, permissions
from rest_framework.response import Response
from .models import TraineeQuestion
from .serializers import TraineeQuestionSerializer

class TraineeQuestionViewSet(viewsets.ModelViewSet):
    serializer_class = TraineeQuestionSerializer
    permission_classes = [
        permissions.IsAuthenticated
        ]
    
    def get_queryset(self):
        return TraineeQuestion.objects.filter(user=self.request.user)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data, status=status.HTTP_201_CREATED)

    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        deleted_item_id = instance.id
        self.perform_destroy(instance)
        return Response({"question_id": deleted_item_id}, status=status.HTTP_200_OK)