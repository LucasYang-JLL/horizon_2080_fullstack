from django.core.mail import send_mail
from backend_service.models import *
import datetime

def my_scheduled_job():
    # horizon_target_individual.objects.filter(progress=100)
    threshold_1 = 0.5
    threshold_2 = 0.8
    # get data from list, filtered by targets that haven't expired
    db_list = list(horizon_target_individual.objects.filter(expire_date__gte = datetime.date.today()).values("progress", "start_date", "expire_date", "created_by_id"))
    # list of email address to remind
    remind_list = []
    # loop through the target lists and find which target needs to be sent to email
    for element in db_list:
        total_duration = (element['expire_date'] - element['start_date']).total_seconds()
        if (total_duration > 0):
            upTillNow = (datetime.date.today() - element['start_date']).total_seconds()
            timeLapse = upTillNow / total_duration
            progress = element['progress']/100
            print(timeLapse, progress)
            if (timeLapse >= threshold_1 and timeLapse < threshold_2 and progress < threshold_1):
                print('this target is behind progress, sending email to user')
                remind_list.append({"target": element["created_by_id"], "template": "template 1"})
            elif (timeLapse >= threshold_2 and progress < 1):
                print('this target is almost due, please wrap up the last details')
                remind_list.append({"target": element["created_by_id"], "template": "template 2"})
    
    print(remind_list)
    pass