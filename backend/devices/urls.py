from django.urls import path
from . import views

urlpatterns = [
    path('devices', views.DeviceListCreateView.as_view()),
    path('devices/<int:pk>', views.DeviceRetrieveUpdateDestroyView.as_view()),
]
