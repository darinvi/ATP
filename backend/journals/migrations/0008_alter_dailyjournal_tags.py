# Generated by Django 4.2.6 on 2023-11-01 20:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('journals', '0007_remove_dailyjournal_comments_journalcomment_journal_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='dailyjournal',
            name='tags',
            field=models.ManyToManyField(blank=True, null=True, related_name='tags', to='journals.tag'),
        ),
    ]