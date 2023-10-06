from rest_framework import routers
# from .api import ...ViewSet

router = routers.DefaultRouter()

# router.register('api/...', ...ViewSet, '...')
router.register('api/filings',)

urlpatterns = router.urls