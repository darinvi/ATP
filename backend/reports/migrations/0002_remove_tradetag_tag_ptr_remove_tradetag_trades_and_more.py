# Generated by Django 4.2.6 on 2023-10-17 21:47

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('reports', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='tradetag',
            name='tag_ptr',
        ),
        migrations.RemoveField(
            model_name='tradetag',
            name='trades',
        ),
        migrations.DeleteModel(
            name='Trade',
        ),
        migrations.DeleteModel(
            name='TradeTag',
        ),
    ]