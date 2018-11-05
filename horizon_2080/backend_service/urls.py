from django.urls import path
from . import views
urlpatterns = [
    path('api/horizon_folder/', views.FolderQuery.as_view() ),
    path('api/create_horizon_folder/', views.FolderCreate.as_view() ),
    path('api/horizon_target_group/', views.TargetGroupCreate.as_view() ),
    path('api/horizon_target_individual/', views.TargetIndividualCreate.as_view() ),
    path('api/horizon_target_individual/<int:folder_id>/', views.TargetIndividualDetailsCreate.as_view() ),
    path('api/update_horizon_target_individual/<int:pk>/', views.UpdateTargetIndividualDetails.as_view() ),
    path('api/create_horizon_target_individual/<int:folder_id>/', views.CreateTargetIndividualDetails.as_view() ),
]