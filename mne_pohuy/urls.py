
from django.contrib import admin
from django.urls import path
from .view import api_endpoint

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_endpoint, name='api_endpoint'),
]
