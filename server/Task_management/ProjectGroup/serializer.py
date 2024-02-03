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
                  "description",
                  "created_by",
                  "created_at",
                  "updated_at",
                  "task"]

        read_only_fields = ['id',
                            'task',
                            'created_at',
                            'updated_at']
