from rest_framework import serializers
from backend_service.models import *
import datetime

class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = folder
        fields = '__all__'

class FolderActiveSerializer(serializers.ModelSerializer):
    class Meta:
        model = folder
        fields = ['active']

class FolderTargetCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = folder
        fields = ['completed_target', 'total_target']

class TargetIndividualSerializer(serializers.ModelSerializer):
    # folder = FolderSerializer(many=False)
    class Meta:
        model = horizon_target_individual
        fields = '__all__'

class TargetIndividualProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = horizon_target_individual
        fields = ['progress']

class SubTargetIndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = '__all__'

class SubTargetIndividualViewedSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = ['viewed']

class SubTargetEventCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = ['event_count']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = '__all__'

class CommentViewedSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = ['viewed']

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = action
        fields = '__all__'

class ActionViewedSerializer(serializers.ModelSerializer):
    class Meta:
        model = action
        fields = ['viewed']

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = '__all__'

class EventViewedSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = ['viewed']

class EventAndSubTargetSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    sub_target = serializers.SerializerMethodField('get_sub_target_by_users_id')
    event = serializers.SerializerMethodField('get_event_by_users_id')
    folder = FolderSerializer()

    def get_sub_target_by_users_id(self, instance): # every instances related to the respective folder object
        nameList = self.context['nameList']
        sub_target = instance.sub_target.filter(created_by_id__in = nameList).order_by('-id')
        return SubTargetIndividualSerializer(sub_target, many = True).data

    def get_event_by_users_id(self, instance): # every instances related to the respective folder object
        nameList = self.context['nameList']
        event = instance.event.filter(created_by_id__in = nameList).order_by('-id')
        return EventSerializer(event, many = True, context=self.context).data

    class Meta:
        model = horizon_target_individual
        fields = ['sub_target', 'event', 'name', 'folder', 'id']

class CombinedCommentSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    comment = serializers.SerializerMethodField('get_comments_by_users_id')
    folder = FolderSerializer()

    def get_comments_by_users_id(self, instance):
        nameList = self.context['nameList']
        comment = instance.comment.filter(created_by_id__in = nameList).order_by('-id')
        return CommentSerializer(comment, many = True, context=self.context).data

    class Meta:
        model = horizon_target_individual
        fields = ['comment', 'name', 'folder', 'id']

class CombinedActionSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    action = serializers.SerializerMethodField('get_actions_by_users_id')
    folder = FolderSerializer()

    def get_actions_by_users_id(self, instance):
        nameList = self.context['nameList']
        action = instance.action.filter(created_by_id__in = nameList).order_by('-id')
        return ActionSerializer(action, many = True, context=self.context).data

    class Meta:
        model = horizon_target_individual
        fields = ['action', 'name', 'folder', 'id']

class TargetByMonthYearSerializer(serializers.ModelSerializer):

    # serializing target count using model property
    complete_count = serializers.SerializerMethodField('target_completed_count_by_month_year') 

    # serializing targets using SerializerMethodField
    target = serializers.SerializerMethodField('get_target_by_month_year') 

    def get_target_by_month_year(self, instance): # every instances related to the respective folder object
        year = self.context['year']
        month = self.context['month']+1
        sorted_target = instance.horizon_target_individual_set.filter(expire_date__month = month, expire_date__year = year).order_by('-expire_date')
        return TargetIndividualSerializer(sorted_target, many = True, context=self.context).data

    def target_completed_count_by_month_year(self, instance):
        year = self.context['year']
        month = self.context['month']+1
        complete_count = instance.horizon_target_individual_set.filter(expire_date__year = year, expire_date__month = month, progress=100).count()
        return complete_count 

    class Meta:
        model = folder
        fields = ['target', 'name', 'id', 'complete_count']

class TargetByOverdueSerializer(serializers.ModelSerializer):
    # serializing target count using model property
    complete_count = serializers.SerializerMethodField('target_completed_count_by_overdue') 
    # serializing targets using SerializerMethodField
    target = serializers.SerializerMethodField('get_target_by_overdue') 
    def get_target_by_overdue(self, instance): # every instances related to the respective folder object
        today = datetime.datetime.today()
        sorted_target = instance.horizon_target_individual_set.filter(expire_date__lt = today, progress__lt = 100)\
            .order_by('expire_date')
        return TargetIndividualSerializer(sorted_target, many = True, context=self.context).data

    def target_completed_count_by_overdue(self, instance):
        # dummy function 
        # only return 0 since the overdue only shows progress that's not completed
        # so it doens't make sense to show completed count
        return 0

    class Meta:
        model = folder
        fields = ['target', 'name', 'id', 'complete_count']

class TargetByBehindScheduleSerializer(serializers.ModelSerializer):
    # serializing target count using model property
    complete_count = serializers.ReadOnlyField(source='target_completion_by_folder')
    # serializing targets using SerializerMethodField
    target = serializers.SerializerMethodField('get_target_by_overdue') 
    def get_target_by_overdue(self, instance): # every instances related to the respective folder object
        sorted_target = instance.horizon_target_individual_set.all()\
            .order_by('expire_date')
        return TargetIndividualSerializer(sorted_target, many = True, context=self.context).data
    class Meta:
        model = folder
        fields = ['target', 'name', 'id', 'complete_count']

class BadgeCountSerializer(serializers.ModelSerializer):

    activityBadgeCount = serializers.SerializerMethodField('get_unviewed_activities') 
    commentBadgeCount = serializers.SerializerMethodField('get_unviewed_comments') 
    actionBadgeCount = serializers.SerializerMethodField('get_unviewed_actions')

    def get_unviewed_activities(self, instance):
        nameList = self.context['nameList']
        event_count = instance.event\
                    .filter(created_by_id__in = nameList, viewed=False).count()
        sub_target_count = instance.sub_target.all()\
                    .filter(created_by_id__in = nameList, viewed=False).count()
        activity_count = event_count + sub_target_count
        return activity_count
    
    def get_unviewed_comments(self, instance):
        nameList = self.context['nameList']
        comment_count = instance.comment\
                    .filter(created_by_id__in = nameList, viewed=False).count()
        return comment_count

    def get_unviewed_actions(self, instance):
        nameList = self.context['nameList']
        action_count = instance.action\
                    .filter(created_by_id__in = nameList, viewed=False).count()
        return action_count

    class Meta:
        model = horizon_target_individual
        fields = ['activityBadgeCount', 'commentBadgeCount', 'actionBadgeCount']