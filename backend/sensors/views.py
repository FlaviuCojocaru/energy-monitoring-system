from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from .serializers import SensorSerializer, MeasurementSerializer
from .models import Sensor, Measurement


class SensorListCreateView(generics.ListCreateAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()


class SensorRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = SensorSerializer
    queryset = Sensor.objects.all()


class MeasurementListCreateView(generics.ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    serializer_class = MeasurementSerializer

    def get_queryset(self):
        """
        Return a queryset containing all measurements belonging to the authenticated client.
        """
        sensor = self.kwargs["sensor_id"]
        measurements = Measurement.objects.filter(sensor=sensor)
        return measurements
