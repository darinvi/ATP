# Generated by Django 4.2.6 on 2023-11-02 13:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('playbooks', '0003_playbookcomment'),
    ]

    operations = [
        migrations.AddField(
            model_name='playbook',
            name='comment',
            field=models.TextField(blank=True, null=True),
        ),
    ]
