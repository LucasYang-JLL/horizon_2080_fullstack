from django.db import models
# Create your models here.
class horizon_target_group(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    critical_flag = models.CharField(max_length=300)
    countable_flag = models.CharField(max_length=300)
    completed_flag = models.CharField(max_length=300)
    start_date = models.DateTimeField()
    expire_date = models.DateTimeField()
    status = models.CharField(max_length=300)
    created_by_id = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name

class horizon_target_individual(models.Model):
    name = models.CharField(max_length=100)
    description = models.CharField(max_length=300)
    critical_flag = models.CharField(max_length=300)
    countable_flag = models.CharField(max_length=300)
    completed_flag = models.CharField(max_length=300)
    start_date = models.DateTimeField()
    expire_date = models.DateTimeField()
    remind_date = models.DateTimeField()
    status = models.CharField(max_length=300)
    target_group_id = models.PositiveIntegerField(default=0)
    user_role_id = models.PositiveIntegerField(default=0)
    created_by_id = models.PositiveIntegerField(default=0)
    def __str__(self):
        return self.name