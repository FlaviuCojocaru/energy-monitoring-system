from django.urls import path
from . import views
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
    TokenVerifyView,
)


urlpatterns = [
     path('users', views.UserListCreateView.as_view()), # list, create(register)
     path('users/<int:pk>', views.UserRetrieveUpdateDestroyView.as_view()), # update, delete, retrive
     path('login', TokenObtainPairView.as_view()),  # login
     path('login/refresh-token', TokenRefreshView.as_view()),
     path('login/verify-token', TokenVerifyView.as_view()),
]