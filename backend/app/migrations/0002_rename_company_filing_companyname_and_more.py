# Generated by Django 4.2.6 on 2023-10-07 16:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='filing',
            old_name='company',
            new_name='companyName',
        ),
        migrations.RenameField(
            model_name='filing',
            old_name='filed_at',
            new_name='filedAt',
        ),
        migrations.RenameField(
            model_name='filing',
            old_name='form_type',
            new_name='formType',
        ),
        migrations.AddField(
            model_name='filing',
            name='linkToFilingDetails',
            field=models.CharField(default='', max_length=100),
            preserve_default=False,
        ),
    ]
