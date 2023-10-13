from django.db import models
from django.contrib.auth.models import User


class Tag(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)


class DailyJournal(models.Model):
    CHOICES = (
            (1, '1'),
            (2, '2'),
            (3, '3'),
            (4, '4'),
            (5, '5'),
        )

    date = models.DateTimeField(auto_now_add=True)
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(to=Tag, related_name='tags')

    patience = models.IntegerField(choices=CHOICES)
    discipline = models.IntegerField(choices=CHOICES)
    preparation = models.IntegerField(choices=CHOICES)
    risk_management = models.IntegerField(choices=CHOICES)
    emotional_management = models.IntegerField(choices=CHOICES)


class JournalComment(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    comment = models.TextField()
    journal = models.ForeignKey(to=DailyJournal, on_delete=models.CASCADE)