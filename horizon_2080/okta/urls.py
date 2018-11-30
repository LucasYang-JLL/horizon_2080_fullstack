from django.urls import path
from . import views
urlpatterns = [
    path('login/', views.okta_login),
    path('login/callback', views.acs),
]