
from django.contrib import admin
from django.urls import path
from .view import api_endpoint
#from .view import RegisterView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_endpoint, name='api_endpoint'),
    #path('register/', RegisterView.as_view(), name='register'),
]
