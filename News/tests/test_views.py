import pytest
from django.urls import reverse
from rest_framework import status
from rest_framework.test import APIClient
from django.core.cache import cache
from News.models import News
from django.conf import settings
from News.views import NewsCreateView, NewsListView, NewsDeleteView, NewsUpdateView


@pytest.fixture
def api_client():
    return APIClient()

@pytest.fixture
def news_item():
    return News.objects.create(title="Test News", content="This is a test news item.")

@pytest.mark.django_db
def test_news_create(api_client):
    url = reverse('news-create')
    data = {'title': 'New News', 'content': 'Content of new news'}
    response = api_client.post(url, data, format='json')
    assert response.status_code == status.HTTP_201_CREATED
    assert News.objects.count() == 1
    assert News.objects.get().title == 'New News'
    assert cache.get('news_list') is None

@pytest.mark.django_db
def test_news_list(api_client, news_item):
    cache_key = 'news_list'
    cache.set(cache_key, [{'id': news_item.id, 'title': news_item.title, 'content': news_item.content}], timeout=60*15)
    url = reverse('news-list')
    response = api_client.get(url)
    assert response.status_code == status.HTTP_200_OK
    assert response.data[0]['title'] == news_item.title

@pytest.mark.django_db
def test_news_update(api_client, news_item):
    url = reverse('news-update', args=[news_item.id])
    data = {'title': 'Updated News', 'content': 'Updated content'}
    response = api_client.put(url, data, format='json')
    assert response.status_code == status.HTTP_200_OK
    
    updated_news = News.objects.get(id=news_item.id)
    assert updated_news.title == 'Updated News'
    assert updated_news.content == 'Updated content'
    
    assert cache.get(f'news_{news_item.id}') is None
    assert cache.get('news_list') is None


@pytest.mark.django_db
def test_news_delete(api_client, news_item):
    url = reverse('news-delete', args=[news_item.id])
    response = api_client.delete(url)
    assert response.status_code == status.HTTP_204_NO_CONTENT
    assert News.objects.count() == 0
    assert cache.get(f'news_{news_item.id}') is None
    assert cache.get('news_list') is None