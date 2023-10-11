from django.urls import path
from rest_framework import routers
from .api import TagViewSet, DailyJournalViewSet

router = routers.DefaultRouter()

router.register('api/tags', TagViewSet, 'tags')
router.register('api/daily-journal-create', TagViewSet, 'daily-journal-create')

urlpatterns = [
    *router.urls,
]
