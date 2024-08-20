from rest_framework import generics
from .models import News
from .serializers import NewsSerializer

class NewsCreateView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

    def create(self, request, *args, **kwargs):
        print(request.data)  # Добавьте это для отладки входящих данных
        return super().create(request, *args, **kwargs)

# Новое представление для отображения списка новостей
class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsListCreateView(generics.ListCreateAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer