from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from accounts.models import Mentors
from django.http import JsonResponse
import requests, json
from scripts.reports import prepare_response
from rest_framework.response import Response
from scripts.mongo.client import mongo_client

REPORT_URL = "https://alaric.propreports.com/api.php"
REPORT_HEADERS = {"Content-Type": "application/x-www-form-URLencoded"}


# TEST FUNC

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_user(request):
    # print(get_trainees_pk(request.user.pk))
    print(request.user)
    return JsonResponse({'da':'ne'})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def call_propreports(request):
    try:
        data=json.loads(request.body)
        # print(data)
        response = requests.post(REPORT_URL, data=data, headers=REPORT_HEADERS)
        # print(response.text)
        action = data.get('action')
        report_type = None
        if action == 'report':
            report_type = data.get('type')
        res_text = prepare_response(action, response.text, report_type)
        if response.status_code != 200:
            return JsonResponse({'message': response.text}, status=response.status_code)
        else:
            return JsonResponse({'response': res_text})
    except requests.exceptions.RequestException as e:
        return JsonResponse({"message": f"Failed to send request: {e}"})

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def get_trade_tags(request):
    db = mongo_client()['testdb']
    collection = db.get_collection("trade_tags")
    tags = collection.find({'user': request.user.id})
    serialized = [{**tag, "_id":str(tag["_id"])} for tag in tags]
    return Response(serialized)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def create_trade_tag(request):
    db = mongo_client()['testdb']
    collection = db.get_collection("trade_tags")
    body = {'user': request.user.id}
    
    data = json.loads(request.body)
    tag = data.get('tag')
    if tag: 
        body['tag'] = tag
    else: 
        return Response({'message': 'Tag is required'}, status=400)
    
    description = data.get('description')
    if description: body['description'] = description
    
    collection.insert_one(body)
    return Response()