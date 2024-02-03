from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from .models import ProjectMembership
from ProjectGroup.models import ProjectGroup
from .serializer import (
    ProjectMembershipSerializer,
    MemberListforProjectSerializer,
)


class ProjectMembershipView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        pm_list = ProjectMembership.objects.all()
        if not pm_list:
            return Response(
                {"Msg": "No Data available"},
                status=status.HTTP_404_NOT_FOUND
            )
        serializer = ProjectMembershipSerializer(pm_list, many=True)
        return Response(
            serializer.data,
            status=status.HTTP_200_OK
        )

    def post(self, request, *args, **kwargs):
        serializer = ProjectMembershipSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_200_OK)


class MemberListView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, project_id, *args, **kwargs):
        try:
            project_instance = ProjectGroup.objects.get(id=project_id)

            serializer = MemberListforProjectSerializer(
                instance=project_instance)
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )
        except:
            return Response(
                {"Msg": "No Data available"},
                status=status.HTTP_404_NOT_FOUND
            )
