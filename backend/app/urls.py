from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter()


urlpatterns = [
    *router.urls,
    path('api/filings', views.get_filing_text),
    path('api/get-filings', views.get_filings),
    # path('api/populate-preferreds', views.populate_preferreds)
    # path('api/populate-historical-dividends', views.populate_historical_dividends)
]
