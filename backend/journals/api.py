from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Tag, DailyJournal, JournalComment
from .serializers import DailyJournalSerializer, TagSerializer, JournalCommentSerializer


class TagViewSet(viewsets.ModelViewSet):
    serializer_class = TagSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        queryset = Tag.objects.filter(user=self.request.user)
        return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class JournalCommentViewSet(viewsets.ModelViewSet):
    serializer_class = JournalCommentSerializer
    permission_classes = [IsAuthenticated]

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DailyJournalViewSet(viewsets.ModelViewSet):
    serializer_class = DailyJournalSerializer
    queryset = DailyJournal.objects.all()

    def perform_create(self, serializer):
        daily_journal = serializer.save(user=self.request.user)
        comments = self.request.data.get('comments')
        for comment in comments:
            JournalComment.objects.create(
                user=self.request.user,
                comment=comment,
                journal=daily_journal
            )