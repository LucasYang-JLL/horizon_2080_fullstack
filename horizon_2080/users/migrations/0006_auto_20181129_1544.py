# Generated by Django 2.0.9 on 2018-11-29 07:44

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0005_auto_20181129_1544'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='employee',
            name='manager',
        ),
        migrations.RemoveField(
            model_name='employee',
            name='user',
        ),
        migrations.RemoveField(
            model_name='manager',
            name='manager',
        ),
        migrations.RemoveField(
            model_name='manager',
            name='user',
        ),
        migrations.DeleteModel(
            name='Employee',
        ),
        migrations.DeleteModel(
            name='Manager',
        ),
    ]
