from django.urls import path
from . import views
urlpatterns = [
    path('api/horizon_folder/', views.FolderQuery.as_view() ),
    path('api/create_horizon_folder/', views.FolderCreate.as_view() ),
    path('api/horizon_target_group/', views.TargetGroupCreate.as_view() ),
    path('api/horizon_target_individual/', views.TargetIndividualCreate.as_view() ),
    path('api/horizon_target_individual/<int:id>/', views.TargetIndividualDetailsCreate.as_view() ),
    path('api/fetch_horizon_target_individual_by_folder/<int:folder_id>/', views.TargetIndividualDetailsQueryByFolder.as_view() ),
    path('api/update_horizon_target_individual/<int:pk>/', views.UpdateTargetIndividualDetails.as_view() ),
    path('api/create_horizon_target_individual/<int:folder_id>/', views.CreateTargetIndividualDetails.as_view() ),
    path('api/create_sub_target_individual/<int:target_id_individual>/', views.CreateSubTargetIndividual.as_view() ),
    path('api/query_sub_target_individual/<int:target_id_individual>/', views.QuerySubTargetIndividual.as_view() ),
    path('api/update_sub_target_individual/<int:pk>/', views.UpdateSubTargetIndividual.as_view() ),
    path('api/fetch_comment_by_target/<int:target_id_individual>/', views.QueryCommentByTarget.as_view() ),
    path('api/fetch_event_by_sub_target/<int:sub_target_id>/', views.QueryEventBySubTarget.as_view() ),
    path('api/create_event_by_sub_target/<int:sub_target_id>/', views.CreateEventBySubTarget.as_view() ),
    path('api/update_event_by_sub_target/<int:pk>/', views.UpdateEventBySubTarget.as_view() ),
]