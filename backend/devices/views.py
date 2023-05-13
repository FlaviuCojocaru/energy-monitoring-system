from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework import status

from .serializers import DeviceSerializer
from .models import Device
from users.models import Client
from users.permissions import IsAdminUser, IsAdminOrReadOnly


class DeviceListCreateView(APIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]

    def get_queryset(self, user):
        if user.is_client():
            client = Client.objects.get(user=user)
            # return only his/her devices
            return Device.objects.filter(client=client)
        # if user is admin then return all devices
        return Device.objects.all()  

    def get(self, request, *args, **kwargs):
        user = request.user
        queryset = self.get_queryset(user)
        serializer = DeviceSerializer(queryset, many=True)
        return Response(serializer.data)

    def post(self, request, *args, **kwargs):
        serializer = DeviceSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class DeviceRetrieveUpdateDestroyView(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated, IsAdminOrReadOnly]
    serializer_class = DeviceSerializer
    queryset = Device.objects.all()
    lookup_field = 'pk'
