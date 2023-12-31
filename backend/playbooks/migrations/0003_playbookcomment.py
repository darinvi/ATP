# Generated by Django 4.2.6 on 2023-11-01 15:07

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('playbooks', '0002_playbook_public'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlayBookComment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('comment', models.TextField()),
                ('playbook', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playbooks.playbook')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
    ]
