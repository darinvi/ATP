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
from scripts.mongo.client import mongo_client
from bson import ObjectId
import json, time

# X7W

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
    timestamp = time.time()
    comment_body = {
        'comment': comment,
        'playbook': playbook,
        'user_id': user.pk,
        'username': user.username,
        'time': timestamp
    }
    response_to = data.get('to')
    if response_to: comment_body['to'] = response_to
    collection = mongo_client()['testdb'].get_collection(data.get('collection'))
    collection.insert_one(comment_body)
    try: 
        created = collection.find_one({'user_id':user.pk, 'time':timestamp})
        if created:
            return Response({**created, '_id': str(created['_id'])}, status=200)
        else:
            return Response({'message': 'Not created'}, status=500)
    except Exception as e:
        return Response({'message': e}, status=500)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def load_playbook_comments(request):
    data = json.loads(request.body)
    collection = mongo_client()['testdb'].get_collection(data.get('collection'))
    return Response([{**c, '_id':str(c["_id"])} for c in collection.find({'playbook':data.get('playbook_id')})])

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def delete_playbook_comment(request):
    data = json.loads(request.body)
    collection = mongo_client()['testdb'].get_collection(data.get('collection'))
    id = data.get('id')
    query = {'_id': ObjectId(id)}
    collection.delete_one(query)
    return Response(id)