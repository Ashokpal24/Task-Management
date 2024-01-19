from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Task
from .serializer import (TaskListSerializer, TaskDetailedSerializer)


class TaskUtils():
    def get_object(self, task_id):
        try:
            return Task.objects.get(id=task_id)
        except Task.DoesNotExist:
            return None


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
        if new_data['mark_done'] == 'true':  # type: ignore
            new_data['percentage'] = 100.0  # type: ignore
        # print(new_data)

        serializer = TaskListSerializer(
            instance=task_instance,
            data=new_data,
            partial=True)
        serializer.is_valid(raise_exception=True)

        serializer.save()
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
