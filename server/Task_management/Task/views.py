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
        taskIndexes = [x.display_order for x in Task.objects.filter(
            status=curr_status
        ).exclude(id=task_id)]
        print(taskIndexes)
        if (curr_index == 0):
            print('cond 0')
            tasks_to_update = Task.objects.filter(
                status=curr_status
            ).exclude(id=task_id)
            for num, task in enumerate(tasks_to_update, 1):
                task.display_order = num
                task.save()
        elif (curr_index-1 not in taskIndexes):
            print('cond -1')
            tasks_to_update = Task.objects.filter(
                status=curr_status,
                display_order=curr_index
            ).exclude(id=task_id)
            for task in tasks_to_update:
                print(task.title, task.display_order)  # type: ignore
                task.display_order = task.display_order-1
                task.save()
        else:
            print('cond +1')
            tasks_to_update = Task.objects.filter(
                status=curr_status,
                display_order__gte=curr_index
            ).exclude(id=task_id)
            for num, task in enumerate(tasks_to_update, 1):
                task.display_order = task.display_order+1
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
        new_data = request.data
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

        return Response(serializer.data, status=status.HTTP_200_OK)

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
