from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .serializer import (
    ProjectListSerializer,
    ProjectDetailedSerializer,
)
from ProjectUser.serializer import ProjectMembershipSerializer
from .models import (
    ProjectGroup
)


class ProjectListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        project_list = ProjectGroup.objects.all()
        if not project_list:
            return Response(
                {"Msg": "No Project available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ProjectListSerializer(project_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        data = {
            "title": request.data.get('title'),
            "description": request.data.get('description'),
            "created_by": request.user.pk
        }
        serializer = ProjectDetailedSerializer(data=data)
        serializer.is_valid(raise_exception=True)
        serializer.save()

        # Project member data
        data = {
            "project": serializer.data["id"],  # type: ignore
            "member": serializer.data["created_by"]  # type: ignore
        }
        new_serializer = ProjectMembershipSerializer(data=data)
        new_serializer.is_valid(raise_exception=True)
        new_serializer.save()

        return Response(serializer.data, status=status.HTTP_200_OK)


class ProjectDetailedView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id, *args, **kwargs):
        project_instance = ProjectGroup.objects.get(id=project_id)
        if not project_instance:
            return Response(
                {"Msg": f"No Project with id {project_instance.pk} available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ProjectDetailedSerializer(instance=project_instance)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )
