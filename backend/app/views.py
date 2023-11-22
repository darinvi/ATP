from django.http import JsonResponse, HttpResponse
import requests, json
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from knox.auth import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from .models import Filing, Tickers, ExDates, TickerVariables
from .serializers import FilingSerializer
from datetime import datetime
from django.db.models import Max
# 
import random
# 
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

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def load_table_data(request):
    tickers = {ticker.pk:[ticker.ticker, ticker.dividend_amount] for ticker in Tickers.objects.all()}
    ex_dates = ExDates.objects.values('ticker').annotate(max_ex_date=Max('ex_date')).distinct()
    # ticker_vars = TickerVariables.objects.all()
    all_data = []
    for object in ex_dates:
        try:
            ticker_data = tickers[object['ticker']]
            # object['amount'] = tickers[object['ticker']]['dividend_amount']
            object['ticker'] = ticker_data[0]
            # RANDOM VALUES USED FOR DEVELOPMENT, SHOULD WORK ON POPULATING
            object['amount'] = random.uniform(0.25, 0.5)
            object['atr'] = random.uniform(0.25, 0.5)
            object['avg_volume'] = random.uniform(5000, 50000)
            object['industry'] = 'SomeIndustry'
            
            all_data.append(object)
        except KeyError:
            pass
    # return JsonResponse({'data': all_data})
    return JsonResponse({'data':all_data})


# Not populating the parents here, need another script to do that
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

# POPULATE ALL OF THEM
# @api_view(['GET'])
# @permission_classes([IsAuthenticated])
# def populate_dividend_amounts(request):
#     ticker = Tickers.objects.create(
#         ticker='CMSD', 
#         name="CMS Energy Corporation 5.875% Junior Subordinated Notes due 2079",
#         parent_ticker='CMS',
#         dividend_amount=0.367188
#     )
#     return JsonResponse({'ticker': ticker.dividend_amount})