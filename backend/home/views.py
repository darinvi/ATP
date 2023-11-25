from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from playbooks.models import PlayBook
from journals.models import DailyJournal
from playbooks.serializers import PublicPlayBookSerializer
from journals.serializers import DailyJournalSerializer
# from django.http import JsonResponse
from rest_framework.response import Response
from scripts.backtests.stock_metrics import compute_metrics
import json
from scripts.mongo.client import mongo_client

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

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_stock_metric(request):
    data = json.loads(request.body)
    ticker = data.get('ticker')
    date = data.get('date')
    print(request.user.pk)
    return Response(compute_metrics(ticker, date))

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def leave_playbook_comment(request):
    data = json.loads(request.body)
    comment = data.get('comment')
    playbook = data.get('playbook')
    user = request.user
    comment_body = {
        'comment': comment,
        'playbook': playbook,
        'by': user.pk,
        'username': user.username
    }
    response_to = data.get('to')
    if response_to: comment_body['to'] = response_to
    db = mongo_client()['testdb']
    collection = db.get_collection(data.get('collection'))
    collection.insert_one(comment_body)
    return Response()