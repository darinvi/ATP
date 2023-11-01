from rest_framework import serializers
from .models import PlayBook
from django.contrib.auth.models import User


class DailyJournalSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = PlayBook
        fields = ('id', 'user', 'patience', 'discipline', 'preparation', 'risk_management', 'emotional_management', 'tags')
