from User.serializer import UserProfileSerializer
from rest_framework import serializers
from .models import (ProjectGroup, ProjectMembership)
from Task.serializer import TaskDetailedSerializer


class ProjectListSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectGroup
        fields = ["id", "title", "created_by"]


class ProjectDetailedSerializer(serializers.ModelSerializer):
    task = TaskDetailedSerializer(
        source='task_list', many=True, read_only=True)

    class Meta:
        model = ProjectGroup
        fields = ["id",
                  "title",
                  "task",
                  "description",
                  "created_by",
                  "created_at",
                  "updated_at"]

        read_only_fields = ['id',
                            'task',
                            'created_at',
                            'updated_at']


class ProjectMembershipSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectMembership
        fields = ["project",
                  "member",
                  "is_active",
                  "created_at",
                  "updated_at"]

        read_only_fields = ['id',
                            'created_at',
                            'updated_at']


class ProjectMembershipUserSerializer(serializers.ModelSerializer):
    member = UserProfileSerializer()

    class Meta:
        model = ProjectMembership
        fields = ["member",
                  "is_active"]


class MemberListforProjectSerializer(serializers.ModelSerializer):
    m_list = ProjectMembershipUserSerializer(source="membership_list",
                                             many=True, read_only=True)

    class Meta:
        model = ProjectGroup
        fields = ["id",
                  "title",
                  "description",
                  "m_list",
                  "created_at",
                  "updated_at"]

        read_only_fields = ['id',
                            "membership_list",
                            'created_at',
                            'updated_at']

# -----
# class ProjectListforMemberSerializer(serializers.ModelSerializer):
#     project_list = ProjectListSerializer(many=True, read_only=True)

#     class Meta:
#         models = ProjectMembership
#         fields = ["is_active", "created_at", "project_list"]

#         read_only_fields = ['id',
#                             'created_at',
#                             'updated_at']
