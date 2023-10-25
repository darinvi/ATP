from django.http import JsonResponse
import requests, json
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from .models import Filing, Tickers, ExDates
from .serializers import FilingSerializer
from datetime import datetime

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


# Not populating the parrents here, need another script to do that
# Should add the scripts to prepare the data and chain it in the project.
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def populate_preferreds(request):
#     with open('app/datasets/tickers.json', 'r') as file:
#         data = json.load(file)
#     for d in data:
#         try:
#             Tickers.objects.create(ticker=d['ticker'], name=d['name'])
#             print(f"success {d['ticker']}")
#         except:
#             print("<-------------FAIL------------->")


# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def populate_historical_dividends(request):
#     with open('app/datasets/pref_ex.json', 'r') as file:
#         data = json.load(file)
#     tickers = [ticker for ticker in Tickers.objects.all()]
#     for ticker in tickers:
#         current_data = [d for d in data if d['ticker'] == ticker.ticker]
#         for d in current_data:
#             date_object = datetime.strptime(d['ex_date'], '%Y-%m-%d').date()
#             ExDates.objects.create(ex_date=date_object, ticker=ticker)