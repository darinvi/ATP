from django.urls import path
from . import views

urlpatterns = [
    path('api/get_dividend_stats/<str:ticker>', views.get_dividend_stats)
]
