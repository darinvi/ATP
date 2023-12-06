from django.urls import path
from . import views

urlpatterns = [
    # *router.urls,
    path('api/test-user', views.test_user),
    path('api/call-propreports', views.call_propreports),
    path('api/reports/create-trade-tag', views.create_trade_tag),
    path('api/reports/get-trade-tags', views.get_trade_tags),
]
