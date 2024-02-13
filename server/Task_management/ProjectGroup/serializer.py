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

    def to_representation(self, instance):
        data = super().to_representation(instance)
        # Sorting data by updated_by field
        sorted_data = data
        sorted_data['task'] = sorted(
            sorted_data['task'],
            key=lambda x: x['updated_at'], reverse=True)
        return sorted_data
