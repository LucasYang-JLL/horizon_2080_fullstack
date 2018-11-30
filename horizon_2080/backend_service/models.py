from django.db import models
from django.forms import ModelForm
import datetime

# Create your models here.

class folder(models.Model):
    name = models.CharField(max_length=100)
    completed_target = models.PositiveIntegerField(default=0)
    total_target = models.PositiveIntegerField(default=0)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    created_by_id = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class horizon_target_individual(models.Model):
    folder = models.ForeignKey(folder, on_delete=models.CASCADE, default=-1)
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    critical_flag = models.BooleanField(blank=True, default=False)
    countable_flag = models.BooleanField(blank=True, default=False)
    completed_flag = models.BooleanField(blank=True, default=False)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    start_date = models.DateField()
    expire_date = models.DateField()
    remind_date = models.DateField(null=True, blank=True)
    status = models.CharField(max_length=300, null=True, blank=True, default="Active")
    progress = models.PositiveIntegerField(default=0)
    user_role_id = models.PositiveIntegerField(default=0)
    city = models.CharField(max_length=100, null=True, blank=True)
    created_by_id = models.CharField(max_length=100)
    def __str__(self):
        return self.name

class sub_target_individual(models.Model):
    target = models.ForeignKey(horizon_target_individual, on_delete=models.CASCADE, default=-1)
    name = models.CharField(max_length=100)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(auto_now=True)
    completed_flag = models.BooleanField(default=False)
    event_count = models.PositiveIntegerField(default=0)
    created_by_id = models.CharField(max_length=100)

class event(models.Model):
    name = models.CharField(max_length=200)
    target = models.ForeignKey(horizon_target_individual, on_delete=models.CASCADE, default=-1)
    sub_target = models.ForeignKey(sub_target_individual, on_delete=models.CASCADE, default=-1)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(auto_now=True)
    created_by_id = models.CharField(max_length=100)
    
class comment(models.Model):
    message = models.CharField(max_length=200)
    target = models.ForeignKey(horizon_target_individual, on_delete=models.CASCADE, default=-1)
    reply_comment_id = models.PositiveIntegerField(default=0)
    private = models.BooleanField(default=False)
    create_date = models.DateTimeField(default=datetime.datetime.now)
    modify_date = models.DateTimeField(default=datetime.datetime.now)
    created_by_id = models.CharField(max_length=100)


