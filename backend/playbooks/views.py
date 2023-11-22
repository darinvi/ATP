from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from .models import PlayBookSeen
from django.db.models import ObjectDoesNotExist
from django.http import JsonResponse

# Create your views here.
@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def manage_playbook_seen(request):
    # action -> bool that shows whether to delete (so can be unseen) or to create.
    action = request.data.get('action')
    playbook_id = request.data.get('id')

    try:
        playbook_seen = PlayBookSeen.objects.get(user=request.user, playbook=playbook_id)
    except ObjectDoesNotExist:
        playbook_seen = None

    if action:
        if not playbook_seen:
            try:
                PlayBookSeen.objects.create(
                    user=request.user,
                    playbook_id=playbook_id
                )
                return JsonResponse({'message':'created succesfully'})
            except Exception as err:
                print(f"Error Creating: {err}")
        else:
            return JsonResponse({'message':'already seen'})
    else:
        if playbook_seen:
            try:
                playbook_seen.delete()
                return JsonResponse({'message':'deleted succesfully'})
            except Exception as err:
                print(f'Error DeletingL {err}')
        else:
            return JsonResponse({'message':'Not seen'})

