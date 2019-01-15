from django.http import HttpResponseRedirect
from django.http import JsonResponse
from django.contrib.auth import logout
from rest_framework import generics

def Logout(request):
    logout(request)
    # Redirect to a success page.
    return HttpResponseRedirect("/landing")

def UserQuery(request):
    userID = request.user.name # my user id
    # Return json response
    return JsonResponse({"user": request.user.name})

def UserAndSubsetQuery(request):
    userID = request.user.name # my user id
    userArr = request.user.report_to_me.all() # the users that report to me
    nameList = []
    for user in userArr:
        nameList.append({"name": user.name, "department": user.department})
    return JsonResponse({"userList": nameList})

def ActionAccess(request):
    actionAccessArr = request.user.own_action_from.all()
    nameList = []
    for user in actionAccessArr:
        nameList.append({"name": user.name, "department": user.department})
    return JsonResponse({"userList": nameList})