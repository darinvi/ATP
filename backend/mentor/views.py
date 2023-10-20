from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from django.http import JsonResponse
from .models import TraineeQuestion, MentorAnswer
from accounts.models import Mentors
from .serializers import TraineeQuestionSerializer
from rest_framework.response import Response

# Create your views here.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_mentor_answer(request):
    pass

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_unanswered_questions(request):
    try:
        Mentors.objects.get(user=request.user)
        questions = TraineeQuestion.objects.filter(answered=False)
        serializer = TraineeQuestionSerializer(questions, many=True)
        return Response(serializer.data)
    except Mentors.DoesNotExist:
        return JsonResponse({'response': 'Not a mentor!'})