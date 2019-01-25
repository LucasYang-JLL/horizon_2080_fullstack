# Generated by Django 2.0.9 on 2019-01-25 02:39

import datetime
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('backend_service', '0006_comment_mention_user_id'),
    ]

    operations = [
        migrations.CreateModel(
            name='action',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('message', models.CharField(max_length=200)),
                ('reply_comment_id', models.PositiveIntegerField(default=0)),
                ('mention_user_id', models.CharField(max_length=100, null=True)),
                ('private', models.BooleanField(default=False)),
                ('create_date', models.DateTimeField(default=datetime.datetime.now)),
                ('modify_date', models.DateTimeField(default=datetime.datetime.now)),
                ('created_by_id', models.CharField(max_length=100)),
                ('target', models.ForeignKey(default=-1, on_delete=django.db.models.deletion.CASCADE, to='backend_service.horizon_target_individual')),
            ],
        ),
    ]
