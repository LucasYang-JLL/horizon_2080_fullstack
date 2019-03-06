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

class TargetYearRangeSerializer(serializers.ModelSerializer):
    year_range = serializers.ReadOnlyField(source='target_year_range')
    class Meta:
        model = horizon_target_individual
        fields = ['year_range']

class TargetIndividualProgressSerializer(serializers.ModelSerializer):
    class Meta:
        model = horizon_target_individual
        fields = ['progress']

class SubTargetIndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = '__all__'

class SubTargetEventCountSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = ['event_count']

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = '__all__'

class ActionSerializer(serializers.ModelSerializer):
    class Meta:
        model = action
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = '__all__'

class EventAndSubTargetSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    # event = EventSerializer(many = True, read_only=True, source='event_set')
    sub_target = SubTargetIndividualSerializer(many = True, read_only=True, source='sub_target_individual_set')
    event = EventSerializer(many = True, read_only=True, source='event_set')
    folder = FolderSerializer()
    class Meta:
        model = horizon_target_individual
        fields = ['sub_target', 'event', 'name', 'folder', 'id']


class CombinedCommentSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    comment = CommentSerializer(many = True, read_only=True, source='comment_set')
    folder = FolderSerializer()
    class Meta:
        model = horizon_target_individual
        fields = ['comment', 'name', 'folder', 'id']

class CombinedActionSerializer(serializers.ModelSerializer):
    # serializing event. nested JSON
    action = ActionSerializer(many = True, read_only=True, source='action_set')
    folder = FolderSerializer()
    class Meta:
        model = horizon_target_individual
        fields = ['action', 'name', 'folder', 'id']

class TargetByMonthYearSerializer(serializers.ModelSerializer):
    # serializing target count using model property
    complete_count = serializers.SerializerMethodField('target_completed_count_by_month_year') 
    # serializing targets using SerializerMethodField
    target = serializers.SerializerMethodField('get_target_by_month_year') 
    def get_target_by_month_year(self, instance): # every instances related to the respective folder object
        year = self.context.get('request').parser_context['kwargs']['year']
        month = self.context.get('request').parser_context['kwargs']['month']+1
        sorted_target = instance.horizon_target_individual_set.filter(expire_date__year = year, expire_date__month = month)\
            .order_by('-expire_date')
        return TargetIndividualSerializer(sorted_target, many = True, context=self.context).data

    def target_completed_count_by_month_year(self, instance):
        year = self.context.get('request').parser_context['kwargs']['year']
        month = self.context.get('request').parser_context['kwargs']['month']+1
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