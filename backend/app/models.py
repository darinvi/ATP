from django.db import models
from django.contrib.auth.models import User

class Filing(models.Model):
    id = models.CharField(max_length=40, unique=True, primary_key=True)
    ticker = models.CharField(max_length=10)
    companyName = models.CharField(max_length=100)
    formType = models.CharField(max_length=10)
    filedAt = models.CharField()
    linkToFilingDetails = models.CharField(max_length=100)