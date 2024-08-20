from django.urls import path
from .views import NewsCreateView, NewsListView, NewsDeleteView, NewsUpdateView

urlpatterns = [
    path('create/', NewsCreateView.as_view(), name='news-create'),
    path('', NewsListView.as_view(), name='news-list'),
    path('<int:pk>/update/', NewsUpdateView.as_view(), name='news-update'),
    path('<int:pk>/delete/', NewsDeleteView.as_view(), name='news-delete'),
]
