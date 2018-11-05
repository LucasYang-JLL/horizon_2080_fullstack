from django.db import models
from django.forms import ModelForm
import datetime

# Create your models here.

class folder(models.Model):
    name = models.CharField(max_length=100)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    created_by_id = models.PositiveIntegerField(default=123456)
    def __str__(self):
        return self.name

class horizon_target_group(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    critical_flag = models.CharField(max_length=300)
    countable_flag = models.CharField(max_length=300)
    completed_flag = models.CharField(max_length=300)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    start_date = models.DateField()
    expire_date = models.DateField()
    status = models.CharField(max_length=300)
    folder_id = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name

class horizon_target_individual(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    critical_flag = models.BooleanField(max_length=300, blank=True, default=False)
    countable_flag = models.BooleanField(max_length=300, blank=True, default=False)
    completed_flag = models.BooleanField(max_length=300, blank=True, default=False)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    start_date = models.DateField()
    expire_date = models.DateField()
    remind_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True, default="Active")
    target_group_id = models.PositiveIntegerField(default=0)
    user_role_id = models.PositiveIntegerField(default=0)
    folder_id = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=123456)
    def __str__(self):
        return self.name

class sub_target_individual(models.Model):
    name = models.CharField(max_length=100)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    completed_flag = models.BooleanField(default=False)
    target_id_individual = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=123456)
