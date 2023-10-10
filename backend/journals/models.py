from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)

# class DailyJournal(models.Model):
#     date = models.DateTimeField(auto_now_add=True)
#     user = models.ForeignKey(to=User, on_delete=models.CASCADE)
#     tags = models.ManyToManyField(to=Tag, related_name='tags')
#     comment = models.TextField(max_length=100)