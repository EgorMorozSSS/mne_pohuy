from rest_framework import generics
from .models import News
from .serializers import Serializer
from django.core.cache import cache
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination

class NewsListPagination(PageNumberPagination):
    page_size = 10  # Количество новостей на одной странице

class NewsCreateView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        response = super().create(request, *args, **kwargs)
        cache.clear()
        return response

class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer
    pagination_class = NewsListPagination

    def list(self, request, *args, **kwargs):
        cache_key = f'news_list_{request.query_params.get("page", 1)}'  # Ключ для кеша с учетом страницы
        news = cache.get(cache_key)
        if not news:
            response = super().list(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)
            return response
        return Response(news)

class NewsUpdateView(generics.RetrieveUpdateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        response = super().update(request, *args, **kwargs)
        cache_key = f'news_{instance.id}'
        cache.delete(cache_key)
        list_cache_key = 'news_list'
        cache.delete(list_cache_key)
        return response

    def get(self, request, *args, **kwargs):
        instance = self.get_object()
        cache_key = f'news_{instance.id}'
        cached_news = cache.get(cache_key)
        if cached_news is not None:
            return Response(cached_news)
        response = super().get(request, *args, **kwargs)
        cache.set(cache_key, response.data, timeout=60*15)
        return response

class NewsDeleteView(generics.DestroyAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def delete(self, request, *args, **kwargs):
        instance = self.get_object()
        response = super().delete(request, *args, **kwargs)

        cache_key = f'news_{instance.id}'
        cache.delete(cache_key)

        list_cache_key = 'news_list'
        cache.delete(list_cache_key)

        return response   