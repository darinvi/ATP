from django.urls import path
from . import views

urlpatterns = [
    # *router.urls,
    path('api/test-user', views.test_user),
    path('api/call-propreports', views.call_propreports),
]
