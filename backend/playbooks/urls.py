from django.urls import path
from rest_framework import routers

router = routers.DefaultRouter()

# router.register('api/tags', TagViewSet, 'tags')

urlpatterns = [
    *router.urls,
]
