# Generated by Django 4.2.6 on 2023-10-20 20:31

from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('mentor', '0002_traineequestion_user'),
    ]

    operations = [
        migrations.AddField(
            model_name='traineequestion',
            name='answered_by',
            field=models.ManyToManyField(blank=True, null=True, related_name='answered_by', to=settings.AUTH_USER_MODEL),
        ),
    ]
