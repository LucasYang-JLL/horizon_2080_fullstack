from django.db import models
from django.forms import ModelForm
import datetime

# Create your models here.

class folder(models.Model):
    name = models.CharField(max_length=100)
    completed_target = models.PositiveIntegerField(default=0)
    total_target = models.PositiveIntegerField(default=0)
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
    # countable_flag = models.BooleanField(max_length=300, blank=True, default=False)
    completed_flag = models.BooleanField(max_length=300, blank=True, default=False)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    start_date = models.DateField()
    expire_date = models.DateField()
    remind_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True, default="Active")
    progress = models.PositiveIntegerField(default=0)
    target_group_id = models.PositiveIntegerField(default=0)
    user_role_id = models.PositiveIntegerField(default=0)
    folder_id = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=123456)
    def __str__(self):
        return self.name

class sub_target_individual(models.Model):
    name = models.CharField(max_length=100)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(auto_now=True)
    completed_flag = models.BooleanField(default=False)
    target_id_individual = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=123456)

class comment(models.Model):
    message = models.CharField(max_length=200)
    target_id_individual = models.PositiveIntegerField(default=0)
    reply_comment_id = models.PositiveIntegerField(default=0)
    private = models.BooleanField(default=False)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(default=datetime.datetime.now)
    created_by_id = models.PositiveIntegerField(default=123456)

class event(models.Model):
    name = models.CharField(max_length=200)
    sub_target_id = models.PositiveIntegerField(default=0)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(auto_now=True)
    created_by_id = models.PositiveIntegerField(default=123456)

