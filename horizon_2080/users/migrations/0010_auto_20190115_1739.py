# Generated by Django 2.0.9 on 2019-01-15 09:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0009_auto_20190115_1733'),
    ]

    operations = [
        migrations.RenameField(
            model_name='user',
            old_name='give_my_action_to',
            new_name='give_action_to',
        ),
    ]