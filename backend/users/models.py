from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser


class Role(models.Model):
    CLIENT = "CLIENT"
    ADMINISTRATOR = "ADMINISTRATOR"
    ROLE_CHOICES = [(CLIENT, "Client"), (ADMINISTRATOR, "Administrator")]

    name = models.CharField(max_length=13, choices=ROLE_CHOICES, default=CLIENT, unique=True)
    
    def __str__(self):
        return self.name


class Client(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    consumer_number = models.CharField(max_length=10, unique=True)
    
    def __str__(self):
        return self.user.username


class User(AbstractUser):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, null=True)
    
    def is_client(self):
        return self.role.name == Role.CLIENT

    def is_admin(self):
        return self.role.name == Role.ADMINISTRATOR
    
    def __str__(self):
        return self.username