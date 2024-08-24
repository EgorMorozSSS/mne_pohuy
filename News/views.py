from rest_framework import generics
from .models import News
from .serializers import Serializer
from django.core.cache import cache
from rest_framework.response import Response

class NewsCreateView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def list(self, request, *args, **kwargs):
        cache_key = 'news_list'
        news = cache.get(cache_key)
        if not news:
            response = super().list(request, *args, **kwargs)
            cache.set(cache_key, response.data, timeout=60*15)  # Кеш на 15 минут
            return response
        return Response(news)

class NewsUpdateView(generics.RetrieveUpdateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

class NewsDeleteView(generics.DestroyAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer   