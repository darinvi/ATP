# Generated by Django 4.2.6 on 2023-11-01 20:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journals', '0008_alter_dailyjournal_tags'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyjournal',
            name='tags',
            field=models.ManyToManyField(blank=True, related_name='tags', to='journals.tag'),
        ),
    ]