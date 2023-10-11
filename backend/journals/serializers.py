from rest_framework import serializers
from .models import Tag, DailyJournal, JournalComment

class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ('user',)

class JournalCommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = JournalComment
        exclude = ('user',)


class DailyJournalSerializer(serializers.ModelSerializer):
    class Meta:
        model = DailyJournal
