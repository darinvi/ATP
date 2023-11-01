from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from django.http import JsonResponse
import requests, json
from .models import DailyJournal, JournalComment
from .serializers import DailyJournalSerializer, JournalCommentSerializer
from accounts.models import Mentors
from .models import Tag

# Many=True important
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_user_journals(request):
    journals = DailyJournal.objects.filter(user=request.user)
    serializer = DailyJournalSerializer(journals, many=True)

    journals_data = serializer.data

    for journal_data in journals_data:
        id = journal_data['id']
        comments = JournalComment.objects.filter(journal_id=id)
        comments_serializer = JournalCommentSerializer(comments, many=True)
        journal_data['comments'] = comments_serializer.data
        
    return JsonResponse({'journals': journals_data})


@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_trainees_journals(request):
    try:
        mentor = Mentors.objects.get(user=request.user)
        trainees = mentor.trainees.all()
        trainee_journals = DailyJournal.objects.filter(user__in=trainees)
        serializer = DailyJournalSerializer(trainee_journals, many=True)

        journals_data = serializer.data

        for journal_data in journals_data:
            id = journal_data['id']
            comments = JournalComment.objects.filter(journal_id=id)
            comments_serializer = JournalCommentSerializer(comments, many=True)
            journal_data['comments'] = comments_serializer.data

        return JsonResponse({'journals': journals_data})

    except Mentors.DoesNotExist:
        return JsonResponse({'response': 'Not a mentor!'})

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_trainees_tags(request):
        try:
            data = json.loads(request.body)
            trainees = data.get('trainees', [])
            queryset = Tag.objects.filter(user__id__in=trainees)
            serialized_data = [{"id": tag.id, "name": tag.name} for tag in queryset]
            return JsonResponse({"tags": serialized_data})
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)
        
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def add_comment_existing_journal(request):
    try:
        data = json.loads(request.body)
        comment = data.get('comment')
        id = data.get('id')
        user = request.user

        journal = DailyJournal.objects.get(pk=id)
        comment = JournalComment.objects.create(user=user, comment=comment, journal=journal)

        comment_serializer = JournalCommentSerializer(comment)
        return JsonResponse({"comment": comment_serializer.data})        

    except Exception as e:
        return JsonResponse({"error": str(e)}, status=500)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_tag(request, id):
    tag = Tag.objects.get(pk=id)
    if tag.user == request.user:
        tag.delete()
        return JsonResponse({'id': id})