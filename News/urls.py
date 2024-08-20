from django.urls import path
from .views import NewsCreateView, NewsListView

urlpatterns = [
    path('create/', NewsCreateView.as_view(), name='news-create'),
    path('', NewsListView.as_view(), name='news-list'),
]
