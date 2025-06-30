from rest_framework import serializers
from .models import User, Project, Task, ActivityLog

# -------------------------------
# User Serializers
# -------------------------------

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'role']


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        username = validated_data.get('username', '')
        email = validated_data.get('email', '')
        role = 'admin' if '@admin' in username else 'contributor'

        user = User.objects.create_user(
            username=username,
            email=email,
            password=validated_data['password'],
            role=role
        )
        return user

# -------------------------------
# Project Serializer
# -------------------------------

class ProjectSerializer(serializers.ModelSerializer):
    owner = UserSerializer(read_only=True)

    class Meta:
        model = Project
        fields = '__all__'

# -------------------------------
# Task Serializer
# -------------------------------

class TaskSerializer(serializers.ModelSerializer):
    assigned_to = UserSerializer(read_only=True)
    assigned_to_id = serializers.PrimaryKeyRelatedField(
        queryset=User.objects.all(),
        source='assigned_to',
        write_only=True,
        required=False
    )

    project = ProjectSerializer(read_only=True)
    project_id = serializers.PrimaryKeyRelatedField(
        queryset=Project.objects.all(),
        source='project',
        write_only=True
    )

    class Meta:
        model = Task
        fields = [
            'id', 'project', 'project_id',
            'title', 'description', 'status',
            'due_date', 'created_at',
            'assigned_to', 'assigned_to_id'
        ]

    def update(self, instance, validated_data):
        # Save old values for logging
        old_assignee = instance.assigned_to
        old_status = instance.status
        old_due_date = instance.due_date

        # Perform update
        instance = super().update(instance, validated_data)

        # Log activity
        ActivityLog.objects.update_or_create(
            task=instance,
            defaults={
                'previous_assignee': old_assignee,
                'previous_status': old_status,
                'previous_due_date': old_due_date
            }
        )

        return instance

# -------------------------------
# Activity Log Serializer
# -------------------------------

class ActivityLogSerializer(serializers.ModelSerializer):
    task_title = serializers.CharField(source='task.title', read_only=True)

    class Meta:
        model = ActivityLog
        fields = [
            'id', 'task_title',
            'previous_assignee', 'previous_status',
            'previous_due_date', 'updated_at'
        ]
