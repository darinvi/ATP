from django.db import models
from django.contrib.auth.models import User

class Filing(models.Model):
    ticker = models.CharField(max_length=10)
    company = models.EmailField(max_length=100)
    form_type = models.CharField(max_length=500, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
