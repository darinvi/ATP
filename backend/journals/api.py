from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from .models import Tag
from .models import DailyJournal
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

    # def get_queryset(self):
    #     queryset = Tag.objects.filter(user=self.request.user)
    #     return queryset
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class DailyJournalViewSet(viewsets.ModelViewSet):
    serializer_class = DailyJournalSerializer
    queryset = DailyJournal.objects.all()

    def perform_create(self, serializer):
        tag_ids = self.request.data.get('tag_ids', [])
        journal_entry = DailyJournal()
        journal_entry.user = self.request.user
        journal_entry.comment = serializer.validated_data['comment']
        journal_entry.save()
        for tag_id in tag_ids:
            tag = Tag.objects.get(pk=tag_id)
            journal_entry.tags.add(tag)
        journal_entry.save()