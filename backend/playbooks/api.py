from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import PlayBook, PlayBookComment, PlayBookSeen
from .serializers import PlayBookSerializer, PublicPlayBookSerializer

class PlayBookViewset(viewsets.ModelViewSet):
    serializer_class = PlayBookSerializer
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

    def get_queryset(self):
        return PlayBook.objects.filter(user=self.request.user)


class UnseenPlayBookViewset(viewsets.ModelViewSet):
    serializer_class = PublicPlayBookSerializer
    permission_classes = [IsAuthenticated]
    
    # only get the playbooks that are not already seen.
    def get_queryset(self):
        seen_playbooks = [seen.playbook.id for seen in PlayBookSeen.objects.filter(user=self.request.user)]
        queryset = PlayBook.objects.filter(public=True).exclude(pk__in=seen_playbooks)
        return queryset
    
class PublicPlayBookViewset(viewsets.ModelViewSet):
    serializer_class = PublicPlayBookSerializer
    permission_classes = [IsAuthenticated]


    def get_queryset(self):
        return PlayBook.objects.filter(public=True)

