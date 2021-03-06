# Generated by Django 2.0.9 on 2019-03-06 07:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('backend_service', '0008_folder_active'),
    ]

    operations = [
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='created_by_id',
            field=models.CharField(blank=True, max_length=100),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='expire_date',
            field=models.DateField(blank=True),
        ),
        migrations.AlterField(
            model_name='horizon_target_individual',
            name='start_date',
            field=models.DateField(blank=True),
        ),
    ]
