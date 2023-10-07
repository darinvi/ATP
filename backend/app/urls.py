from rest_framework import routers
from django.urls import path
from . import views
from .api import FilingViewSet

router = routers.DefaultRouter()

router.register('api/list-all-filings', FilingViewSet, 'list-filings')

urlpatterns = [
    *router.urls,
    path('api/filings', views.get_filing_text),
    # path('api/save-filings', views.save_filings),
    # path('api/make-password', views.make_passwordd),
]

# urlpatterns = router.urls