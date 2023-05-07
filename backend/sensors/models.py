from django.db import models
from devices.models import Device


class Sensor(models.Model):
    device = models.OneToOneField(Device, on_delete=models.CASCADE)
    description = models.CharField(max_length=500, blank=True)
    max_value = models.FloatField()
    
class Measurement(models.Model):
    sensor = models.ForeignKey(Sensor, on_delete=models.CASCADE)
    value = models.FloatField()
    timestamp = models.DateTimeField()