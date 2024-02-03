from rest_framework import serializers
from .models import User
from ProjectGroup.serializer import ProjectListSerializer


class UserRegisterationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(
        style={'input_type', 'password'},
        write_only=True
    )

    class Meta:
        model = User
        fields = ['name', 'username', 'email', 'password', 'password2']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password != password2:
            raise serializers.ValidationError(
                "Password and Confirm Password mismatched"
            )
        return attrs

    def create(self, validate_data):
        return User.objects.create_user(**validate_data)  # type: ignore


class UserLoginSerializer(serializers.ModelSerializer):
    username = serializers.CharField(max_length=255)

    class Meta:
        model = User
        fields = ["username", "password"]


class UserProfileSerializer(serializers.ModelSerializer):
    project_list = ProjectListSerializer(
        source='user_list', many=True, read_only=True)

    class Meta:
        model = User
        fields = ["id", "name", "username", "email", "project_list"]
