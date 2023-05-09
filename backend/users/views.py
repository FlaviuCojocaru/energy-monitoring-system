from rest_framework import generics, permissions, authentication
from rest_framework.views import APIView
from rest_framework.response import Response

from .serializers import UserSerializer
from .models import User


class UserListView(APIView):
    serializer_class = UserSerializer
    
    def get(self, request, *args, **kwargs):
        queryset = User.objects.all()
        serializer = self.serializer_class(queryset, many=True)
        return Response(serializer.data)
    
class UserRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()
    lookup_field = 'pk'