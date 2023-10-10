from rest_framework import routers
from django.urls import path
from . import views

router = routers.DefaultRouter()

# router.register('api/list-filings', FilingViewSet, 'list-filings')

urlpatterns = [
    *router.urls,
    path('api/filings', views.get_filing_text),
    path('api/get-filings', views.get_filings),
]
