from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import Subtask
from .serializer import SubtaskListSerializer


class SubtaskUtils():
    def get_object(self, subtask_id):
        try:
            return Subtask.objects.get(id=subtask_id)
        except Subtask.DoesNotExist:
            return None


class SubtaskListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        subtask_list = Subtask.objects.all()
        if not subtask_list:
            return Response(
                {"Msg": "No Subtask available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = SubtaskListSerializer(subtask_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        data = {
            "title": request.data.get('title'),
            "task": request.data.get('task'),
            "created_by": request.user.pk
        }
        serializer = SubtaskListSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class SubtaskDetailedView(APIView, SubtaskUtils):
    permission_classes = [IsAuthenticated]

    def get(self, request, subtask_id, *args, **kwargs):
        subtask_instance = self.get_object(subtask_id)
        if not subtask_instance:
            return Response(
                {"Msg": f"No Subtask of id {subtask_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = SubtaskListSerializer(subtask_instance)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, subtask_id, *args, **kwargs):
        subtask_instance = self.get_object(subtask_id)
        if not subtask_instance:
            return Response(
                {"Msg": f"No Subtask of id {subtask_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = SubtaskListSerializer(
            instance=subtask_instance,
            data=request.data,
            partial=True)

        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)

    def delete(self, request, subtask_id, *args, **kwargs):
        subtask_instance = self.get_object(subtask_id)
        if not subtask_instance:
            return Response(
                {"Msg": f"No Subtask of id {subtask_id} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        subtask_instance.delete()
        return Response(
            {"Msg": "Object deleted!"},
            status=status.HTTP_200_OK
        )
