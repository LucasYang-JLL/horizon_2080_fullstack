from django.urls import path
from . import views
urlpatterns = [
    path('api/horizon_target_group/', views.TargetGroupCreate.as_view() ),
    path('api/horizon_target_individual/', views.TargetIndividualCreate.as_view() ),
]