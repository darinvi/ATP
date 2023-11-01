from django.db import models
from django.contrib.auth.models import User

class TraineeQuestion(models.Model):
    answered = models.BooleanField(default=False)
    description = models.CharField(max_length=100, blank=False, null=False)
    question_type = models.CharField(max_length=30, default='general')
    question = models.TextField(blank=False, null=False)
    anonymous = models.BooleanField(default=False)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    answered_by = models.ManyToManyField(to=User, related_name="answered_by")

class MentorAnswer(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    answer = models.TextField()
    question = models.ForeignKey(to=TraineeQuestion, on_delete=models.CASCADE)