from rest_framework import serializers
from .models import Task
from Subtask.serializer import SubtaskListSerializer


class TaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Task

        fields = ['id',
                  'title',
                  'status',
                  'display_order',
                  'percentage',
                  'project_id',
                  'created_by',
                  'created_at',
                  'updated_at']

        read_only_fields = ['id',
                            'created_at',
                            'updated_at']


class TaskDetailedSerializer(serializers.ModelSerializer):
    subtasks = SubtaskListSerializer(many=True, read_only=True)

    class Meta:
        model = Task

        fields = ['id',
                  'title',
                  'status',
                  'display_order',
                  'percentage',
                  'subtasks',
                  'project_id',
                  'created_by',
                  'created_at',
                  'updated_at']

        read_only_fields = ['id',
                            'created_at',
                            'updated_at']

        ordering = ['display_order']
