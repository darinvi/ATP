from rest_framework import serializers
from .models import Tag, DailyJournal, JournalComment
from django.contrib.auth.models import User


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        exclude = ('user',)

class JournalCommentSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = JournalComment
        fields = ('id', 'user', 'comment', 'journal')


class DailyJournalSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = DailyJournal
        fields = ('id', 'user', 'patience', 'discipline', 'preparation', 'risk_management', 'emotional_management', 'tags')

    def create(self, validated_data):
        tags_data = validated_data.pop('tags', [])

        user = validated_data.pop('user', None)

        daily_journal = DailyJournal.objects.create(user=user, **validated_data)

        for tag in tags_data:
            daily_journal.tags.add(tag)

        return daily_journal