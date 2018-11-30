
from django.urls import path
from . import views

urlpatterns = [
    path('logout/', views.Logout),
    path('api/user_info/', views.UserQuery ),
    path('api/user_subset_info/', views.UserAndSubsetQuery )
]
