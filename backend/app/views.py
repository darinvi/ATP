from django.http import JsonResponse
import requests, json
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from .models import Filing 
from .serializers import FilingSerializer


# FILINGS

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_filing_text(request):
    data = json.loads(request.body)
    url = data.get('url', '')
    user_agent = request.META.get('HTTP_USER_AGENT', '')
    headers = {
        'User-Agent': user_agent,
    }
    html_text = requests.get(url, headers=headers).text
    context = {'text': html_text}
    return JsonResponse(context)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def get_filings(request):
    data = json.loads(request.body)
    # filters = data.get('filters','') -> #APPLY FILTERS IF ANY
    filings = Filing.objects.all()
    serializer = FilingSerializer(filings, many=True)
    serialized_filings = serializer.data
    return JsonResponse({'filings': serialized_filings})



# REPORTS:

REPORT_URL = "https://alaric.propreports.com/api.php"
REPORT_HEADERS = {"Content-Type": "application/x-www-form-URLencoded"}

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

def prepare_response(action, data):
    # call with page 1. Have logic to call for page 2 if the response sais 1/2.
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