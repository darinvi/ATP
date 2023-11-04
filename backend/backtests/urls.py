from django.urls import path
from . import views

urlpatterns = [
    path('api/get-dividend-stats/<str:ticker>', views.get_dividend_stats),
    path('api/get-spy-compaies', views.get_spy)
]
