from rest_framework import serializers
from .models import PlayBook
from journals.serializers import TagSerializer
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username') 

class PlayBookSerializer(serializers.ModelSerializer):
    user = serializers.IntegerField(source='user.id', read_only=True)

    class Meta:
        model = PlayBook
        fields = (
            'id', 
            'user',
            'ticker',
            'play',
            'tags',
            'date',
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
        if tags:
            for tag in tags:
                playbook.tags.add(tag)
        return playbook
    
class PublicPlayBookSerializer(serializers.ModelSerializer):
    # Using a serializer like that, returns the whole tags representation (with its fields) instead of only returning the pk
    tags = TagSerializer(many=True, read_only=True)
    user = UserSerializer()
    # add additional field
    post_type = serializers.SerializerMethodField()

    class Meta:
        model = PlayBook
        fields = '__all__'

    def get_post_type(self, obj):
        return "Playbook"