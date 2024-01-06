from rest_framework import serializers
from .models import Subtask


class SubtaskListSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subtask
        fields = ['id',
                  'title',
                  'task',
                  'mark_done',
                  'created_by',
                  'created_at',
                  'updated_at']

        read_only_fields = ['id',
                            'created_at',
                            'updated_at']
