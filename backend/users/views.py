from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def hello_world(request):
    return Response({"message": "Hello, world!"})

@api_view(['GET', 'POST'])
def hello_world2(request):
    if request.method == 'POST':
        return Response({"message": "Got some data!", "data primita": request.data})
    return Response({"message": "Hello, world2!"})