from django.urls import path
from . import views

urlpatterns = [
    path('sensors', views.SensorListCreateView.as_view()),
    path('sensors/<int:pk>', views.SensorRetrieveUpdateDestroyView.as_view()),
    path('sensors/measurements', views.MeasurementListView.as_view()),
]