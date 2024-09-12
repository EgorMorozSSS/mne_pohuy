from django.http import JsonResponse

def api_endpoint(request):
    data = {
        'message': 'Hello from Django!',
        'status': 'success'
    }
    return JsonResponse(data)

