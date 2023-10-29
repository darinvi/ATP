from django.db import models
from django.contrib.auth.models import User

class Filing(models.Model):
    id = models.CharField(max_length=40, unique=True, primary_key=True)
    ticker = models.CharField(max_length=10)
    companyName = models.CharField(max_length=100)
    formType = models.CharField(max_length=10)
    filedAt = models.CharField()
    linkToFilingDetails = models.CharField(max_length=100)

class MarketHolidays(models.Model):
    date = models.DateTimeField(blank=False, null=False)
    weekday = models.BooleanField(blank=False, null=False)

class Tickers(models.Model):
    ticker = models.CharField(blank=False, unique=True, max_length=10)
    name = models.TextField(blank=True, null=True) #not migrated
    parent_ticker = models.CharField(blank=True, null=True, max_length=10)
    dividend_amount = models.FloatField(blank=True, null=True)

# one ticker can have many ex-dates as historical will also be saved- backtest
class ExDates(models.Model):
    ex_date = models.DateField(null=True)
    ticker = models.ForeignKey(to=Tickers, on_delete=models.CASCADE)

class TickerVariables(models.Model):
    ticker = models.ForeignKey(to=Tickers, on_delete=models.CASCADE)
    atr = models.FloatField(null=True)
    avg_v = models.FloatField(null=True)
    # industry = models.CharField(null=True)