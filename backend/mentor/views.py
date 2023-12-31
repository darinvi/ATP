from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from django.http import JsonResponse
from .models import TraineeQuestion, MentorAnswer
from accounts.models import Mentors
from .serializers import TraineeQuestionSerializer
from rest_framework.response import Response
from rest_framework import status
from backend.custom_auth import isMentor


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, isMentor]) 
def get_unanswered_questions(request):
    questions = TraineeQuestion.objects.filter(answered=False).exclude(answered_by=request.user)
    serializer = TraineeQuestionSerializer(questions, many=True)
    return Response(serializer.data)
    
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, isMentor])
def add_mentor_answer(request):
    question_id = request.data.get('question_id')
    try:
        question_instance = TraineeQuestion.objects.get(pk=question_id)
        question_instance.answered_by.add(request.user)
        MentorAnswer.objects.create(
            user=request.user,
            answer=request.data.get('answer'),
            question=question_instance
        )
        if question_instance.answered_by.count() >= 2:
            question_instance.answered = True
            question_instance.save()
        return Response({'message': 'MentorAnswer created successfully', 'question_id': question_id}, status=status.HTTP_201_CREATED)
    except TraineeQuestion.DoesNotExist:
        return Response({'error': 'Invalid question ID'}, status=status.HTTP_400_BAD_REQUEST)