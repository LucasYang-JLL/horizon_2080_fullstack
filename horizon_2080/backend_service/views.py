from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from rest_framework import generics
from backend_service.models import *
from backend_service.serializers import *

#
# Folder Views
#

class FolderQuery(generics.ListCreateAPIView):
    queryset = folder.objects.all()
    serializer_class = FolderSerializer

class FolderCreate(generics.CreateAPIView):
    queryset = folder.objects.all()
    serializer_class = FolderSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

#
# Target Group Views
#

class TargetGroupCreate(generics.ListCreateAPIView):
    queryset = horizon_target_group.objects.all()
    serializer_class = TargetGroupSerializer

#
# Target Individual Views
#

class TargetIndividualCreate(generics.ListCreateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualSerializer

class TargetIndividualDetailsCreate(generics.ListCreateAPIView):
    serializer_class = TargetIndividualSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return horizon_target_individual.objects.filter(id=self.kwargs['id'])

class TargetIndividualDetailsQueryByFolder(generics.ListCreateAPIView):
    serializer_class = TargetIndividualSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return horizon_target_individual.objects.filter(folder_id=self.kwargs['folder_id'])

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

class CreateTargetIndividualDetails(generics.CreateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualSerializer
    lookup_field = "folder_id"

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

#
# Sub Target Views
#

class CreateSubTargetIndividual(generics.CreateAPIView):
    queryset = sub_target_individual.objects.all()
    serializer_class = SubTargetIndividualSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

class QuerySubTargetIndividual(generics.ListCreateAPIView):
    serializer_class = SubTargetIndividualSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return sub_target_individual.objects.filter(target_id_individual=self.kwargs['target_id_individual'])

class UpdateSubTargetIndividual(generics.UpdateAPIView):
    queryset = sub_target_individual.objects.all()
    serializer_class = SubTargetIndividualSerializer
    
    def update(self, request, *args, **kwargs):
        # creates an instance of the model object from the requested id
        instance = self.get_object()
        # parse the model to be put into database
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

#
# Comment Views
#

class QueryCommentByTarget(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return comment.objects.filter(target_id_individual=self.kwargs['target_id_individual'])

#
# Event Views
#

class QueryEventBySubTarget(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return event.objects.filter(sub_target_id=self.kwargs['sub_target_id'])

class CreateEventBySubTarget(generics.CreateAPIView):
    queryset = event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

class UpdateEventBySubTarget(generics.UpdateAPIView):
    queryset = event.objects.all()
    serializer_class = EventSerializer
    
    def update(self, request, *args, **kwargs):
        # creates an instance of the model object from the requested id
        instance = self.get_object()
        # parse the model to be put into database
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)
