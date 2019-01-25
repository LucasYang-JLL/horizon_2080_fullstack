from django.shortcuts import render, get_object_or_404
from rest_framework.response import Response
from django.http import JsonResponse
from django.db.models import Max
from rest_framework import generics
from backend_service.models import *
from backend_service.serializers import *

#
# Folder Views
#

class FolderQuery(generics.ListCreateAPIView):
    # queryset = folder.objects.all()
    serializer_class = FolderSerializer
    def get_queryset(self):
        userID = self.request.user.name # my user id
        print(self.request.user.report_to.all()) # the users that I report to
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)
        print(nameList)
        return folder.objects.filter(created_by_id__in = nameList)

class FolderQueryByID(generics.ListCreateAPIView):
    serializer_class = FolderSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return folder.objects.filter(id=self.kwargs['pk'])

class FolderCreate(generics.CreateAPIView):
    queryset = folder.objects.all()
    serializer_class = FolderSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

class FolderUpdate(generics.UpdateAPIView):
    queryset = folder.objects.all()
    serializer_class = FolderSerializer
    
    def update(self, request, *args, **kwargs):
        # creates an instance of the model object from the requested id
        instance = self.get_object()
        # parse the model to be put into database
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

class UpdateTargetCountByFolder(generics.UpdateAPIView):
    queryset = folder.objects.all()
    serializer_class = FolderTargetCountSerializer
    
    def update(self, request, *args, **kwargs):
        # creates an instance of the model object from the requested id
        instance = self.get_object()
        # parse the model to be put into database
        serializer = self.get_serializer(instance, data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)
        return Response(serializer.data)

#
# Target Individual Views
#
class TargetIndividualQuery(generics.ListCreateAPIView):
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
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)
        return horizon_target_individual.objects.filter(folder_id=self.kwargs['folder_id'], created_by_id__in = nameList)

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

class UpdateTargetIndividualProgress(generics.UpdateAPIView):
    queryset = horizon_target_individual.objects.all()
    serializer_class = TargetIndividualProgressSerializer
    
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
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
        # serializer = self.get_serializer(data=request.data)
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
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

class QuerySubTargetIndividual(generics.ListCreateAPIView):
    serializer_class = SubTargetIndividualSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)
        return sub_target_individual.objects.filter(target_id=self.kwargs['target_id_individual'], created_by_id__in = nameList)

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

class UpdateEventCountBySubTarget(generics.UpdateAPIView):
    queryset = sub_target_individual.objects.all()
    serializer_class = SubTargetEventCountSerializer
    
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
        return comment.objects.filter(target_id=self.kwargs['target_id_individual'])

class CreateCommentByTarget(generics.CreateAPIView):
    queryset = comment.objects.all()
    serializer_class = CommentSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

#
# Action Views
#

class QueryActionByTarget(generics.ListCreateAPIView):
    serializer_class = ActionSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        return action.objects.filter(target_id=self.kwargs['target_id_individual'])

class CreateActionByTarget(generics.CreateAPIView):
    queryset = action.objects.all()
    serializer_class = ActionSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)
        
#
# Event Views
#

class QueryEventBySubTarget(generics.ListCreateAPIView):
    serializer_class = EventSerializer
    # queryset = horizon_target_individual.objects.all()
    def get_queryset(self):
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)
        return event.objects.filter(sub_target=self.kwargs['sub_target_id'], created_by_id__in = nameList)

class CreateEventBySubTarget(generics.CreateAPIView):
    queryset = event.objects.all()
    serializer_class = EventSerializer

    def create(self, request, *args, **kwargs):
        # parse the model to be put into database
        # don't put the instance in here!! that causes the model to be ran on an existing row!!
        entry = request.data
        entry['created_by_id'] = request.user.name
        serializer = self.get_serializer(data=entry)
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

#
#  Joined Queries
#

class QuerySubTargetAndEventDateDesc(generics.ListCreateAPIView):
    serializer_class = EventAndSubTargetSerializer
    def get_queryset(self):
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)

        horizon_target_individual_Annotated = horizon_target_individual.objects.annotate(latest_id = Max('sub_target_individual__id')) # annotated with sub target's newest id
        filtered_list = horizon_target_individual_Annotated.all().filter(created_by_id__in = nameList).exclude(event__isnull=True, sub_target_individual__isnull=True).order_by('-latest_id') # order the list by the newest sub target at the front
        limited_filter_list = filtered_list[:5]
        return limited_filter_list

class QueryEventDateDesc(generics.ListCreateAPIView):
    serializer_class = CombinedCommentSerializer
    def get_queryset(self):
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)

        horizon_target_individual_Annotated = horizon_target_individual.objects.annotate(latest_id = Max('comment__id')) # annotated with sub target's newest id
        filtered_list = horizon_target_individual_Annotated.all().filter(created_by_id__in = nameList).exclude(comment__isnull=True).order_by('-latest_id') # order the list by the newest sub target at the front
        limited_filter_list = filtered_list[:5]
        return limited_filter_list

class QueryActionDateDesc(generics.ListCreateAPIView):
    serializer_class = CombinedActionSerializer
    def get_queryset(self):
        userID = self.request.user.name # my user id
        userArr = self.request.user.report_to_me.all() # the users that report to me
        nameList = [userID]
        for user in userArr:
            nameList.append(user.name)

        horizon_target_individual_Annotated = horizon_target_individual.objects.annotate(latest_id = Max('action__id')) # annotated with sub target's newest id
        filtered_list = horizon_target_individual_Annotated.all().filter(created_by_id__in = nameList).exclude(comment__isnull=True).order_by('-latest_id') # order the list by the newest sub target at the front
        limited_filter_list = filtered_list[:5]
        return limited_filter_list