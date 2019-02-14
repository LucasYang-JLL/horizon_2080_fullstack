import sys
import os
sitepackage = "D:\home\site\wwwroot\env\Lib\site-packages"
sys.path.append(sitepackage)
myproject = "D:\home\site\wwwroot"
sys.path.append(myproject)
from optparse import OptionParser

usage = "usage: %prog -s SETTINGS | --settings=SETTINGS"
parser = OptionParser(usage)
parser.add_option('-s', '--settings', dest='settings', metavar='SETTINGS', help="The Django settings module to use", default='horizon_2080.settings')
(options, args) = parser.parse_args()

if not options.settings:
 parser.error("You must specgfy a settings module")
os.environ['DJANGO_SETTINGS_MODULE']=options.settings
from django.core.wsgi import get_wsgi_application
application = get_wsgi_application()
from django.core.mail import send_mail
from backend_service.models import *
from users.models import *
import datetime

def my_scheduled_job():
    # horizon_target_individual.objects.filter(progress=100)
    threshold_1 = 0.5
    threshold_2 = 0.8
    # get data from list, filtered by targets that haven't expired
    db_list = list(horizon_target_individual.objects.filter(expire_date__gte = datetime.date.today()).values("name", "progress", "start_date", "expire_date", "created_by_id", "id", "folder_id"))
    user_list = list(User.objects.all())
    # print(user_list)
    for user in user_list:
        print(user.email, user.name)
    # list of email address to remind
    remind_list = []
    # loop through the target lists and find which target needs to be sent to email
    for element in db_list:
        total_duration = (element['expire_date'] - element['start_date']).total_seconds()
        if (total_duration > 0):
            upTillNow = (datetime.date.today() - element['start_date']).total_seconds()
            timeLapse = upTillNow / total_duration # time spent 
            progress = element['progress']/100 # progress
            print('time lapsed:',timeLapse)
            print('progress(%):', progress)
            # if time spent greater than threshold 1 but less than thresshold 2, while progress is less than threshold 1
            if (timeLapse >= threshold_1 and timeLapse < threshold_2 and progress < threshold_1):
                print('this target is behind progress, sending email to user')
                remind_list.append({"target_user": element["created_by_id"], "target_name": element["name"], "reminder": "This target is behind progress", "id": element["id"]})
            # if time spent greater than treshold 2 while progress is not 100% yet
            elif (timeLapse >= threshold_2 and progress < 1):
                print('this target is almost due, please wrap up the last details')
                remind_list.append({"target_user": element["created_by_id"], "target_name": element["name"], "reminder": "This target is almost due", "id": element["id"]})
    
    # get the email address            
    for item in remind_list:
        for user in user_list:
            if(user.name == item["target_user"]):
                # set up email template
                email_template = """<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
                <html xmlns="http://www.w3.org/1999/xhtml">
                <head>
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <title>Horizon 2080 Reminder Email</title>
                <style type="text/css">#outlook a{padding:0}.ReadMsgBody{width:100%}.ExternalClass{width:100%}.ExternalClass,.ExternalClass p,.ExternalClass span,.ExternalClass font,.ExternalClass td,.ExternalClass div{line-height:100%}body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:100%;-ms-text-size-adjust:100%}table,td{mso-table-lspace:0;mso-table-rspace:0}img{-ms-interpolation-mode:bicubic}body{margin:0;padding:0}img{border:0;height:auto;line-height:100%;outline:0;text-decoration:none}table{border-collapse:collapse!important}body,#bodyTable,#bodyCell{height:100%!important;margin:0;padding:0;width:100%!important}#bodyCell{padding:20px}#templateContainer{width:600px}#bodyCell{border-top:4px solid #bbb;background-color:#ebecec}#templateContainer{border:1px solid #bbb}h1{color:#202020;display:block;font-family:Helvetica;font-size:26px;font-style:normal;font-weight:bold;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h2{color:#404040!important;display:block;font-family:Helvetica;font-size:20px;font-style:normal;font-weight:bold;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h3{color:#606060!important;display:block;font-family:Helvetica;font-size:16px;font-style:italic;font-weight:normal;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}h4{color:#808080!important;display:block;font-family:Helvetica;font-size:14px;font-style:italic;font-weight:normal;line-height:100%;letter-spacing:normal;margin-top:0;margin-right:0;margin-bottom:10px;margin-left:0;text-align:left}#templatePreheader{background-color:white;border-bottom:1px solid #ccc}.preheaderContent{color:#808080;font-family:Helvetica;font-size:10px;line-height:125%;text-align:left}.preheaderContent a:link,.preheaderContent a:visited,.preheaderContent a .yshortcuts{color:#606060;font-weight:normal;text-decoration:underline}#templateHeader{background-color:white;border-top:1px solid #fff;border-bottom:1px solid #ccc}.headerContent{color:#505050;font-family:Helvetica;font-size:20px;font-weight:bold;line-height:100%;padding-top:0;padding-right:0;padding-bottom:0;padding-left:0;text-align:left;vertical-align:middle}.headerContent a:link,.headerContent a:visited,.headerContent a .yshortcuts{color:#eb4102;font-weight:normal;text-decoration:underline}#headerImage{height:auto;max-width:600px}#templateBody{background-color:white;border-top:1px solid #fff;border-bottom:1px solid #ccc}.bodyContent{color:#505050;font-family:Helvetica;font-size:14px;line-height:150%;padding-top:20px;padding-right:20px;padding-bottom:20px;padding-left:20px;text-align:left}.bodyContent a:link,.bodyContent a:visited,.bodyContent a .yshortcuts{color:#eb4102;font-weight:normal;text-decoration:underline}.bodyContent img{display:inline;height:auto;max-width:560px}#templateFooter{background-color:white;border-top:1px solid #fff}.footerContent{color:#808080;font-family:Helvetica;font-size:10px;line-height:150%;padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px;text-align:left}.footerContent a:link,.footerContent a:visited,.footerContent a .yshortcuts,.footerContent a span{color:#606060;font-weight:normal;text-decoration:underline}@media only screen and (max-width:480px){body,table,td,p,a,li,blockquote{-webkit-text-size-adjust:none!important}body{width:100%!important;min-width:100%!important}#bodyCell{padding:10px!important}#templateContainer{max-width:600px!important;width:100%!important}h1{font-size:24px!important;line-height:100%!important}h2{font-size:20px!important;line-height:100%!important}h3{font-size:18px!important;line-height:100%!important}h4{font-size:16px!important;line-height:100%!important}#templatePreheader{display:none!important}#headerImage{height:auto!important;max-width:600px!important;width:100%!important}.headerContent{font-size:20px!important;line-height:125%!important}.bodyContent{font-size:18px!important;line-height:125%!important}.footerContent{font-size:14px!important;line-height:115%!important}.footerContent a{display:block!important}}</style>
                </head>
                """ + """<body leftmargin="0" marginwidth="0" topmargin="0" marginheight="0" offset="0"> <center> <table align="center" border="0" cellpadding="0" cellspacing="0" height="100%" width="100%" id="bodyTable"> <tr> <td align="center" valign="top" id="bodyCell"> <table border="0" cellpadding="0" cellspacing="0" id="templateContainer"> <tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templatePreheader"> <tr> <td valign="top" class="preheaderContent" style="padding-top:10px;padding-right:20px;padding-bottom:10px;padding-left:20px" mc:edit="preheader_content00"> This is a reminder email that a target is behind schedule </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateBody"> <tr> <td valign="top" class="bodyContent" mc:edit="body_content"> <a style="text-decoration:none" href="https://horizon2080.chinacloudsites.cn/performance/project/{id}"><h1 style="color:rgb(62,116,173)">{target_name}</h1></a> <h3>{reminder}</h3> Please take notice, this target is behind schedule and needs your attention <br/> </td></tr></table> </td></tr><tr> <td align="center" valign="top"> <table border="0" cellpadding="0" cellspacing="0" width="100%" id="templateFooter"> <tr> <td valign="top" class="footerContent" mc:edit="footer_content00" style="float:right"> <a style="text-decoration:none;color:#3e74ad" href="https://horizon2080.chinacloudsites.cn"><b>Horizon 2080</b></a> <em>Copyright &copy; 2019 JLL, All rights reserved.</em> </td></tr></table> </td></tr></table> </td></tr></table> </center> </body> </html>""".format(**item)
                item["user_email"] = user.email
                send_mail(
                    "[Horizon 2080] "+ item["target_name"] + " behind schedule",
                    "Please take a look at: "+ item["target_name"] + ". Some time has past. Hello, {}".format(item["target_name"]),
                    "TDIM.China@ap.jll.com",
                    # [user.email],
                    ["lucas.yang@ap.jll.com"],
                    html_message=email_template
                )
    print(remind_list)
    pass

def target_urgency():
    print('target is urgent')
    target_list = list(horizon_target_individual.objects.filter(expire_date__gte = datetime.date.today()).values("name", "progress", "start_date", "expire_date", "created_by_id", "id", "folder_id"))
    # list of targets that's urgent
    urgent_list = []
    # list of targets that's non urgent
    non_urgent_list = []
    # loop through the target lists and find which target needs to be sent to email
    for element in target_list:
        total_duration = (element['expire_date'] - element['start_date']).total_seconds()
        if (total_duration > 0):
            upTillNow = (datetime.date.today() - element['start_date']).total_seconds()
            timeLapse = upTillNow / total_duration # time spent 
            progress = element['progress']/100 # progress
            print('time lapsed:',timeLapse)
            print('progress(%):', progress)
            # if time spent greater than threshold 1 but less than thresshold 2, while progress is less than threshold 1
            if (timeLapse > progress):
                print('Behind schedule')
                urgent_list.append(element['id'])
            # if time spent greater than treshold 2 while progress is not 100% yet
            else:
                print('Ahead of schedule')
                non_urgent_list.append(element['id'])
    horizon_target_individual.objects.filter(id__in=urgent_list).update(urgent=True)
    horizon_target_individual.objects.filter(id__in=non_urgent_list).update(urgent=False)
    
my_scheduled_job()