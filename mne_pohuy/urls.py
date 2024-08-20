# urls.py в основной директории

from django.contrib import admin
from django.urls import path, include, re_path
from .views import RegisterView
from django.conf import settings
from django.conf.urls.static import static
from News.views import NewsCreateView, NewsListView, NewsListCreateView, NewsRetrieveUpdateDestroyView  # Импортируйте новое представление
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

schema_view = get_schema_view(
   openapi.Info(
      title="API Documentation",
      default_version='v1',
      description="API documentation for your Django project",
      terms_of_service="https://www.google.com/policies/terms/",
      contact=openapi.Contact(email="contact@example.com"),
      license=openapi.License(name="BSD License"),
   ),
   public=True,
   permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('register/', RegisterView.as_view(), name='register'),
    path('profile/', include('profiles.urls')),
    path('news/', include('News.urls')),
    path('swagger/', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
