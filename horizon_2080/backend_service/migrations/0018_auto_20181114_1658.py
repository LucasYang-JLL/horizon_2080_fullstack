# Generated by Django 2.0.9 on 2018-11-14 08:58

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('backend_service', '0017_auto_20181114_1656'),
    ]

    operations = [
        migrations.RenameField(
            model_name='folder',
            old_name='completed',
            new_name='completed_target',
        ),
    ]