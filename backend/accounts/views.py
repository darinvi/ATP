from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from django.http import JsonResponse
from .models import Mentors

# Many=True important
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_mentor_status(request):
    try:
        mentor = Mentors.objects.get(user=request.user)
        trainee_pks = [{'id':trainee.pk, 'first_name':trainee.first_name,'last_name':trainee.last_name,'username':trainee.username}\
                        for trainee in mentor.trainees.all()]
        return JsonResponse({'trainees':trainee_pks, 'mentor': True})
    except Mentors.DoesNotExist:
        return JsonResponse({'trainees':[], 'mentor':False})