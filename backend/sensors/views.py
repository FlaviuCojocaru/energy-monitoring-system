from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import SensorSerializer, MeasurementSerializer
from .models import Sensor, Measurement
from users.models import Client
from devices.models import Device


class SensorListCreateView(generics.ListCreateAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()
    
class SensorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()
    
class MeasurementListView(generics.ListAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MeasurementSerializer
    
    def get_queryset(self):
        """
        Return a queryset containing all measurements belonging to the authenticated client.
        """
        owner = Client.objects.get(user=self.request.user)
        devices = Device.objects.filter(client=owner)
        sensors = Sensor.objects.filter(device__in = devices)
        measurements = Measurement.objects.filter(sensor__in = sensors)
        return measurements