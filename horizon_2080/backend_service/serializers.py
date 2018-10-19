from rest_framework import serializers
from backend_service.models import *
# class LeadSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Lead
#         fields = ('id', 'name', 'email', 'message')

class LeadSerializer(serializers.ModelSerializer):
    class Meta:
        model = horizon_target_group
        fields = '__all__'