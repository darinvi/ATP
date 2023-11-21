from django.urls import path
from . import views

urlpatterns = [
    path("api/load-all-posts/<str:model_types>", views.load_all_posts),
]