from django.urls import path
from rest_framework import routers
from .api import PlayBookViewset

router = routers.DefaultRouter()

router.register('api/playbooks', PlayBookViewset, 'playbooks')

urlpatterns = [
    *router.urls,
]
