from django.urls import path
from rest_framework import routers
from .api import TagViewSet, DailyJournalViewSet
from . import views

router = routers.DefaultRouter()

router.register('api/tags', TagViewSet, 'tags')
router.register('api/daily-journal-create', DailyJournalViewSet, 'daily-journal-create')

urlpatterns = [
    *router.urls,
    path('api/get-user-journals', views.get_user_journals),
]
