from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from django.http import JsonResponse
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from journals.models import JournalComment
from playbooks.models import PlayBook
from journals.models import DailyJournal
from playbooks.serializers import PublicPlayBookSerializer
from journals.serializers import DailyJournalSerializer
# from django.http import JsonResponse
from rest_framework.response import Response

MODELS = {
    'playbook': PlayBook, 
    'journal': DailyJournal
}

SERIALIZERS = {
    'playbook': PublicPlayBookSerializer,
    'journal': DailyJournalSerializer 
}
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def load_all_posts(request, model_types): 
    types = model_types.split("-")
    
    results = []

    for t in types:
        current_model = MODELS[t]
        current_serializer = SERIALIZERS[t]
        model_name = current_model.__name__

        if t == 'playbook':
            playbooks = current_serializer(current_model.objects.all(), many=True).data
        elif t == 'idea':
            pass
        elif t == 'generic':
            pass
        results = [*results, *current_serializer(current_model.objects.all(), many=True).data]

    return Response(results)