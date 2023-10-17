from django.db import models
from journals.models import Tag

# class Trade(models.Model):
#     hashed = models.CharField(blank=False, null=False)

# class TradeTag(Tag):
#     trades = models.ManyToManyField(to=Trade, related_name='trades')