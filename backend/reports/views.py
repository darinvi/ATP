from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from accounts.models import Mentors
from django.http import JsonResponse
import requests, json


REPORT_URL = "https://alaric.propreports.com/api.php"
REPORT_HEADERS = {"Content-Type": "application/x-www-form-URLencoded"}


# TEST FUNC

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def test_user(request):
    print(get_trainees_pk(request.user.pk))
    return JsonResponse({'da':'ne'})




@api_view(['POST'])
@permission_classes([IsAuthenticated])
def call_propreports(request):
    try:
        data=json.loads(request.body)
        response = requests.post(REPORT_URL, data=data, headers=REPORT_HEADERS)
        res_text = prepare_response(data.get('action'), response.text)
        if response.status_code != 200:
            return JsonResponse({'message': response.text}, status=response.status_code)
        else:
            return JsonResponse({'response': res_text})
    except requests.exceptions.RequestException as e:
        return JsonResponse({"message": f"Failed to send request: {e}"})



# HELPER FUNCTIONS

# call with page 1. Have logic to call for page 2 if the response sais 1/2.
def prepare_response(action, data):
    def handle_get_accounts(accounts):
        all_accounts = []
        for acc in [account.split(',') for account in accounts.split('\n')]:
            if len(acc) > 1 and "Account Id" not in acc:
                accId, user, *rest = acc
                accName, *name = user.split()
                name = ' '.join(name)
                all_accounts.append((accId, accName, name))    
        return all_accounts

    map_actions = {
        'login': lambda x: x,
        'accounts': lambda x: handle_get_accounts(x),
    }

    new_data = data
    if action in map_actions.keys():
        new_data = map_actions[action](data)
    return new_data


# provide the pk of the mentor and get an itarator of trainees. Return the pk 
def get_trainees_pk(pk):
    return [trainee.pk for trainee in Mentors.objects.get(user=pk).trainees.all()]
