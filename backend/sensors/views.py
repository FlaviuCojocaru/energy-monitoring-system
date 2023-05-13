from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import SensorSerializer
from .models import Sensor
from users.permissions import IsAdminOrReadOnly


class SensorListCreateView(generics.ListCreateAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()
    
class SensorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()    