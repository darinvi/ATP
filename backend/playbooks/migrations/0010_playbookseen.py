# Generated by Django 4.2.7 on 2023-11-20 17:42

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('playbooks', '0009_alter_playbook_tags'),
    ]

    operations = [
        migrations.CreateModel(
            name='PlayBookSeen',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('playbook', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='playbooks.playbook')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'unique_together': {('playbook', 'user')},
            },
        ),
    ]
