from rest_framework import serializers
from .models import PlayBook
from django.contrib.auth.models import User


class PlayBookSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = PlayBook
        fields = (
            'id', 
            'user',
            'tags',
            # 'date',
            'market_fundamentals',
            'market_technicals',
            'ticker_fundamentals',
            'ticker_technicals',
            'trade_management',
            'tape_reading',
            'public'
        )

    def create(self, validated_data):
        tags = validated_data.pop('tags',[])
        user = validated_data.pop('user', None)
        playbook = PlayBook.objects.create(user=user, **validated_data)
        for tag in tags:
            playbook.tags.add(tag)
        return playbook