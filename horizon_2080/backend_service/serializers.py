from rest_framework import serializers
from backend_service.models import *

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