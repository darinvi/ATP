from rest_framework import serializers
from .models import TraineeQuestion

class TraineeQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = TraineeQuestion
        fields = ('id', 'answered', 'description', 'question_type', 'question', 'anonymous')
