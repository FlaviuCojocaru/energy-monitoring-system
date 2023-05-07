from django.urls import path
from .views import hello_world, hello_world2


urlpatterns = [
     path('1', hello_world),
     path('2', hello_world2),
]