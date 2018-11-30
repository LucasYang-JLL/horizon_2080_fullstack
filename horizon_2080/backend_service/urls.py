from django.urls import path
from . import views
urlpatterns = [
    path('api/horizon_folder/', views.FolderQuery.as_view() ),
    path('api/fetch_horizon_folder_by_id/<int:pk>/', views.FolderQueryByID.as_view() ),
    path('api/updateTargetCountByFolder/<int:pk>/', views.UpdateTargetCountByFolder.as_view() ),
    path('api/create_horizon_folder/', views.FolderCreate.as_view() ),
    path('api/horizon_target_individual/', views.TargetIndividualQuery.as_view() ),
    path('api/horizon_target_individual/<int:id>/', views.TargetIndividualDetailsCreate.as_view() ),
    path('api/fetch_horizon_target_individual_by_folder/<int:folder_id>/', views.TargetIndividualDetailsQueryByFolder.as_view() ),
    path('api/update_horizon_target_individual/<int:pk>/', views.UpdateTargetIndividualDetails.as_view() ),
    path('api/update_horizon_target_individual_progress/<int:pk>/', views.UpdateTargetIndividualProgress.as_view() ),
    path('api/create_horizon_target_individual/<int:folder_id>/', views.CreateTargetIndividualDetails.as_view() ),
    path('api/create_sub_target_individual/<int:target_id_individual>/', views.CreateSubTargetIndividual.as_view() ),
    path('api/query_sub_target_individual/<int:target_id_individual>/', views.QuerySubTargetIndividual.as_view() ),
    path('api/update_sub_target_individual/<int:pk>/', views.UpdateSubTargetIndividual.as_view() ),
    path('api/update_event_count/<int:pk>', views.UpdateEventCountBySubTarget.as_view() ),
    path('api/fetch_comment_by_target/<int:target_id_individual>/', views.QueryCommentByTarget.as_view() ),
    path('api/create_comment_by_target/<int:target_id_individual>/', views.CreateCommentByTarget.as_view() ),
    path('api/fetch_event_by_sub_target/<int:sub_target_id>/', views.QueryEventBySubTarget.as_view() ),
    path('api/create_event_by_sub_target/<int:sub_target_id>/', views.CreateEventBySubTarget.as_view() ),
    path('api/update_event_by_sub_target/<int:pk>/', views.UpdateEventBySubTarget.as_view() ),
    path('api/fetch_sub_target_and_event_limit_10/', views.QuerySubTargetAndEventDateDesc.as_view() ),
]