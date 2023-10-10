from django.db import models
from django.contrib.auth.models import User
from django.contrib.postgres.fields import ArrayField

class Mentors(models.Model):
    user = models.OneToOneField(to=User, unique=True, on_delete=models.CASCADE, related_name='mentor')
    trainees = models.ManyToManyField(to=User, related_name='trainees')
