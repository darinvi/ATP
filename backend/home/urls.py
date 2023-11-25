from django.urls import path
from . import views

urlpatterns = [
    path("api/load-all-posts/<str:model_types>", views.load_all_posts),
    path("api/get_stock_metrics", views.get_stock_metric),
    path("api/create-playbook-comment", views.leave_playbook_comment),
    path("api/load-playbook-comments", views.load_playbook_comments),
    path("api/delete-playbook-comment", views.delete_playbook_comment),
]