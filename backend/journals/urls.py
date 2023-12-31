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
    path('api/get-trainees-journals', views.get_trainees_journals),
    path('api/get-trainees-tags', views.get_trainees_tags),
    path('api/add-comment-existing-journal', views.add_comment_existing_journal),
    path('api/delete-tag/<int:id>', views.delete_tag),
]
