from django.db import models
from users.models import Client


class Address(models.Model):
    country = models.CharField(max_length=56)
    city = models.CharField(max_length=100)
    county = models.CharField(max_length=100)
    street = models.CharField(max_length=100)
    street_number = models.CharField(max_length=10)
    apartment = models.CharField(max_length=10, blank=True)

    def __str__(self):
        return f"{self.country} city: {self.city} st: {self.street}"


class Device(models.Model):
    client = models.ForeignKey(Client, on_delete=models.CASCADE)
    address = models.ForeignKey(Address, on_delete=models.CASCADE)
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=500, blank=True)
    max_energy_consumption = models.FloatField()

    def __str__(self):
        return f"device id: {self.id}, client name: {self.client.user.username}"