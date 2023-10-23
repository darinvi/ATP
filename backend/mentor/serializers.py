from rest_framework import serializers
from .models import TraineeQuestion, MentorAnswer


class MentorAnswerSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    class Meta:
        model = MentorAnswer
        fields = ['answer', 'username']



class TraineeQuestionSerializer(serializers.ModelSerializer):
    username = serializers.CharField(source='user.username', read_only=True)
    answers = MentorAnswerSerializer(many=True, read_only=True, source='mentoranswer_set')

    class Meta:
        model = TraineeQuestion
        fields = ('id', 'answered', 'description', 'question_type', 'question', 'anonymous', 'username', 'answers')