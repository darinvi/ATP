from django.db import models
from django.contrib.auth.models import User
from journals.models import Tag

class PlayBook(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    tags = models.ManyToManyField(to=Tag, blank=True)
    date = models.DateTimeField(auto_now_add=True)
    ticker = models.CharField(max_length=10)
    play = models.CharField(max_length=100)
    market_fundamentals = models.TextField(null=True, blank=True)
    market_technicals = models.TextField(null=True, blank=True)
    ticker_fundamentals = models.TextField(null=True, blank=True)
    ticker_technicals = models.TextField(null=True, blank=True)
    trade_management = models.TextField(null=True, blank=True)
    tape_reading = models.TextField(null=True, blank=True)
    public = models.BooleanField(default=True)

class PlayBookComment(models.Model):
    user = models.ForeignKey(to=User, on_delete=models.CASCADE)
    playbook = models.ForeignKey(to=PlayBook, on_delete=models.CASCADE)
    comment = models.TextField()

class PlayBookSeen(models.Model):
    playbook = models.ForeignKey(PlayBook, on_delete=models.CASCADE)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    class Meta:
        unique_together = ('playbook', 'user')
