# Generated by Django 2.0.9 on 2018-10-24 02:27

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_service', '0003_auto_20181022_0916'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horizon_target_group',
            name='expire_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='horizon_target_group',
            name='start_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='expire_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='remind_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='start_date',
            field=models.DateField(),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='target_group_id',
            field=models.PositiveIntegerField(default=0),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='user_role_id',
            field=models.PositiveIntegerField(default=0),
        ),
    ]
