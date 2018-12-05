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
    userArr = request.user.user_set.all() # the users that report to me
    nameList = []
    for user in userArr:
        nameList.append(user.name)
    return JsonResponse({"userList": nameList})