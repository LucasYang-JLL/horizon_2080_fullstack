from rest_framework import serializers
from backend_service.models import *
# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = ('id', 'name', 'email', 'message')
class FolderSerializer(serializers.ModelSerializer):
    class Meta:
        model = folder
        fields = '__all__'

class TargetGroupSerializer(serializers.ModelSerializer):
    class Meta:
        model = horizon_target_group
        fields = '__all__'

class TargetIndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = horizon_target_individual
        fields = '__all__'

class SubTargetIndividualSerializer(serializers.ModelSerializer):
    class Meta:
        model = sub_target_individual
        fields = '__all__'

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = comment
        fields = '__all__'

class EventSerializer(serializers.ModelSerializer):
    class Meta:
        model = event
        fields = '__all__'