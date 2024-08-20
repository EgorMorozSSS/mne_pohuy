from rest_framework import generics
from .models import News
from .serializers import Serializer

class NewsCreateView(generics.CreateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

    def create(self, request, *args, **kwargs):
        return super().create(request, *args, **kwargs)

class NewsListView(generics.ListAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

class NewsUpdateView(generics.RetrieveUpdateAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer

class NewsDeleteView(generics.DestroyAPIView):
    queryset = News.objects.all()
    serializer_class = Serializer