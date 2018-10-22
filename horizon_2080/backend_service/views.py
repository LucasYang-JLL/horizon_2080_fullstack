from django.shortcuts import render
from backend_service.models import *
from backend_service.serializers import *
from rest_framework import generics
# Create your views here.
class TargetGroupCreate(generics.ListCreateAPIView):
    queryset = horizon_target_group.objects.all()
    serializer_class = TargetGroupSerializer

class TargetIndividualCreate(generics.ListCreateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualSerializer