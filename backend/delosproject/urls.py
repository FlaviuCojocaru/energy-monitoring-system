from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('device-management/', include("devices.urls")),
    path('sensor-management/', include("sensors.urls")),
    path('user-management/', include("users.urls")),
]
