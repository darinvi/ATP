from django.urls import path
from rest_framework import routers
from . import views
from . import api

router = routers.DefaultRouter()

router.register('api/ask-mentor', api.TraineeQuestionViewSet, 'ask-mentor')

urlpatterns = [
    *router.urls,
    path('api/get-unanswered-questions', views.get_unanswered_questions)
]
