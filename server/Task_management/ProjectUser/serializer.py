from rest_framework import serializers
from User.serializer import UserProfileSerializer
from .models import ProjectMembership
from ProjectGroup.models import ProjectGroup


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
    member_list = ProjectMembershipUserSerializer(source="membership_list",
                                                  many=True, read_only=True)

    class Meta:
        model = ProjectGroup
        fields = ["id",
                  "title",
                  "description",
                  "member_list",
                  "created_at",
                  "updated_at"]

        read_only_fields = ['id',
                            "member_list",
                            'created_at',
                            'updated_at']
