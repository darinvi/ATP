from django.urls import path
from rest_framework import routers
from .api import PlayBookViewset, PublicPlayBookViewset

router = routers.DefaultRouter()

router.register('api/playbooks', PlayBookViewset, 'playbooks')
router.register('api/playbooks-all', PublicPlayBookViewset, 'playbooks')

urlpatterns = [
    *router.urls,
]
