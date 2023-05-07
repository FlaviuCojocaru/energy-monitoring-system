from django.contrib import admin
from .models import Role, User, Client

admin.site.register(Role)
admin.site.register(Client)
admin.site.register(User)