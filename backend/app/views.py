from django.http import JsonResponse
import requests

def get_filing(request):
    if request.method == 'post':
        user_agent = request.META.get('HTTP_USER_AGENT', '')
        headers = {
            'User-Agent': user_agent,
        }
        html_text = requests.get(request.body.url, headers=headers).text
        context = {'text': html_text}
        return JsonResponse(context)
    return JsonResponse({'text':'works'})