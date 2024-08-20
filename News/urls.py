from django.urls import path
from .views import NewsCreateView, NewsListView, NewsDeleteView

urlpatterns = [
    path('create/', NewsCreateView.as_view(), name='news-create'),
    path('', NewsListView.as_view(), name='news-list'),
    path('<int:pk>/delete/', NewsDeleteView.as_view(), name='news-delete'),
]
