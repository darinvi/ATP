from rest_framework import serializers
from .models import TraineeQuestion, MentorAnswer

class TraineeQuestionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = TraineeQuestion
        fields = ('id', 'answered', 'description', 'question_type', 'question', 'anonymous', 'username')

class MentorAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = MentorAnswer
        exclude = ['user']