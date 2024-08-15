
from django.contrib import admin
from django.urls import path
from .view import api_endpoint
from .views import RegisterView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', api_endpoint, name='api_endpoint'),
    path('register/', RegisterView.as_view(), name='register'),
]
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
