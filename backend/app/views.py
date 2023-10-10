from django.http import JsonResponse
import requests, json
from rest_framework.decorators import api_view, permission_classes, authentication_classes
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

