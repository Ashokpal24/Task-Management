from rest_framework import serializers
from .models import ProjectGroup
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


# -----
# class ProjectListforMemberSerializer(serializers.ModelSerializer):
#     project_list = ProjectListSerializer(many=True, read_only=True)

#     class Meta:
#         models = ProjectMembership
#         fields = ["is_active", "created_at", "project_list"]

#         read_only_fields = ['id',
#                             'created_at',
#                             'updated_at']
