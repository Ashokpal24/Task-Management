from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializer import (TaskListSerializer, TaskDetailedSerializer)
from django.db.models import Max, F


class TaskUtils():
    def get_object(self, task_id):
        try:
            return Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return None

    def update_display_position(self, task_id, curr_index, curr_status):
        taskIndexes = [x.id for x in Task.objects.filter(  # type: ignore
            status=curr_status
        ).order_by('display_order').exclude(id=task_id)]

        print(taskIndexes, task_id, curr_index)
        taskIndexes.insert(curr_index, task_id)
        print(taskIndexes)
        for idx, temp_id in enumerate(taskIndexes, 0):
            task = Task.objects.get(id=temp_id)
            task.display_order = idx
            task.save()


class TaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        task_list = Task.objects.all()
        if not task_list:
            return Response(
                {"Msg": "No Task available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskListSerializer(task_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        data = {
            "title": request.data.get('title'),
            "project_id": request.data.get('project_id'),
            "status": 'New',
            "display_order": Task.objects.filter(status="Progress").aggregate(Max("display_order", default=0)),
            "created_by": request.user.pk
        }
        serializer = TaskListSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class TaskDetailedView(APIView, TaskUtils):
    permission_classes = [IsAuthenticated]

    def get(self, request, task_id, *args, **kwargs):
        task_instance = self.get_object(task_id)
        if not task_instance:
            return Response(
                {"Msg": f"No Task of id {task_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = TaskDetailedSerializer(task_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, task_id, *args, **kwargs):
        task_instance = self.get_object(task_id)
        if not task_instance:
            return Response(
                {"Msg": f"No Task of id {task_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        new_data = request.data.copy()
        try:
            new_data.pop('display_order')
        except:
            print('display order not found in request ,skipped')
        print(new_data)
        serializer = TaskListSerializer(
            instance=task_instance,
            data=new_data,
            partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        curr_index = request.data.get(
            'display_order') if request.data.get('display_order') != None else None
        curr_status = request.data.get(
            'status') if request.data.get('status') != None else None
        if (curr_index != None):
            self.update_display_position(
                task_id=task_id,
                curr_index=curr_index,
                curr_status=curr_status,
            )

        # return Response(serializer.data, status=status.HTTP_200_OK)
        return Response({'msg': 'Done'}, status=status.HTTP_200_OK)

    def delete(self, request, task_id, *args, **kwargs):
        task_instance = self.get_object(task_id)
        if not task_instance:
            return Response(
                {"Msg": f"No Task of id {task_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        task_instance.delete()
        return Response(
            {"Msg": "Object deleted!"},
            status=status.HTTP_200_OK
        )
