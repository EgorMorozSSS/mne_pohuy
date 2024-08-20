from django.urls import path
from .views import NewsCreateView, NewsListView, NewsListCreateView, NewsRetrieveUpdateDestroyView

urlpatterns = [
    path('create/', NewsCreateView.as_view(), name='news-create'),
    path('', NewsListView.as_view(), name='news-list'),
]
