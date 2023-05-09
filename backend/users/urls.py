from django.urls import path
from . import views


urlpatterns = [
     path('users/', views.UserListView.as_view()), # list
     path('users/<int:pk>', views.UserRetrieveUpdateDestroyView.as_view()), # update, delete, retrive
     # path('users/register/') # register
     # path('users/login/') # login
]