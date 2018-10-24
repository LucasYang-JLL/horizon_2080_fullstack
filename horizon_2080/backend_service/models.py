from django.db import models
from django.forms import ModelForm
# Create your models here.
class horizon_target_group(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    critical_flag = models.CharField(max_length=300)
    countable_flag = models.CharField(max_length=300)
    completed_flag = models.CharField(max_length=300)
    start_date = models.DateField()
    expire_date = models.DateField()
    status = models.CharField(max_length=300)
    created_by_id = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name

class horizon_target_individual(models.Model):
    name = models.CharField(max_length=100, null=True, blank=True)
    description = models.CharField(max_length=300, null=True, blank=True)
    critical_flag = models.CharField(max_length=300, null=True, blank=True)
    countable_flag = models.CharField(max_length=300, null=True, blank=True)
    completed_flag = models.CharField(max_length=300, null=True, blank=True)
    start_date = models.DateField()
    expire_date = models.DateField()
    remind_date = models.DateField()
    status = models.CharField(max_length=300, null=True, blank=True)
    target_group_id = models.PositiveIntegerField(default=0)
    user_role_id = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name
