# Generated by Django 4.2.6 on 2023-10-27 19:05

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_tickers_name'),
    ]

    operations = [
        migrations.AddField(
            model_name='tickers',
            name='dividend_amount',
            field=models.FloatField(blank=True, null=True),
        ),
    ]
