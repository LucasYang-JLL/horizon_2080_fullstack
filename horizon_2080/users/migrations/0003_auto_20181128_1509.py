# Generated by Django 2.0.9 on 2018-11-28 07:09

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_auto_20181128_1449'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='emailable',
            field=models.BooleanField(default=True),
        ),
    ]
