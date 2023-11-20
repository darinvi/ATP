from django.urls import path
from rest_framework import routers
from .api import PlayBookViewset, PublicPlayBookViewset, UnseenPlayBookViewset
from . import views

router = routers.DefaultRouter()

router.register('api/playbooks', PlayBookViewset, 'playbooks')
router.register('api/playbooks-unseen', UnseenPlayBookViewset, 'playbooks')
router.register('api/playbooks-all', PublicPlayBookViewset, 'playbooks')

urlpatterns = [
    *router.urls,
    path('api/playbooks-manage-seen', views.manage_playbook_seen),
]
