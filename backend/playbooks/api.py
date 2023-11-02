from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PlayBook, PlayBookComment
from .serializers import PlayBookSerializer

class PlayBookViewset(viewsets.ModelViewSet):
    serializer_class = PlayBookSerializer
    queryset = PlayBook.objects.all()
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        playbook = serializer.save(user=self.request.user)
        comments = self.request.data.get('comments')
        if comments:
            for comment in comments:
                PlayBookComment.objects.create(
                    user=self.request.user,
                    comment=comment,
                    playbook=playbook
                )