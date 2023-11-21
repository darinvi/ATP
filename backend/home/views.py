from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from playbooks.models import PlayBook
from journals.models import DailyJournal

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def load_all_posts(request, model_types): 
    types = model_types.split("-")
    models = {
        'playbook': PlayBook, 
        'journal': DailyJournal
    }
    for m in [models[t] for t in types]:
        print(m.objects.all())
    pass