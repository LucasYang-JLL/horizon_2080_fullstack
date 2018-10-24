from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from backend_service.models import *
from backend_service.serializers import *

# Create your views here.
class TargetGroupCreate(generics.ListCreateAPIView):
    queryset = horizon_target_group.objects.all()
    serializer_class = TargetGroupSerializer

class TargetIndividualCreate(generics.ListCreateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualSerializer

class TargetIndividualDetailsCreate(generics.ListCreateAPIView):
    serializer_class = TargetIndividualSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return horizon_target_individual.objects.filter(id=self.kwargs['id'])

class UpdateTargetIndividualDetails(generics.UpdateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualSerializer
    
    def update(self, request, *args, **kwargs):
        # creates an instance of the model object from the requested id
        instance = self.get_object()
        # parse the model to be put into database
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)