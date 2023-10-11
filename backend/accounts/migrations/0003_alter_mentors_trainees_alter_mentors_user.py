# Generated by Django 4.2.6 on 2023-10-10 13:57

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('accounts', '0002_mentors_delete_traderstatus'),
    ]

    operations = [
        migrations.AlterField(
            model_name='mentors',
            name='trainees',
            field=models.ManyToManyField(related_name='trainees', to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='mentors',
            name='user',
            field=models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, related_name='mentor', to=settings.AUTH_USER_MODEL),
        ),
    ]