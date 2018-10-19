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
    def __str__(self):
        return self.name