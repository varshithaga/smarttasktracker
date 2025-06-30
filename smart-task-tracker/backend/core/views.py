from datetime import timedelta
from django.utils import timezone
from rest_framework import viewsets, permissions, status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated

from .models import User, Project, Task, ActivityLog
from .serializers import (
    RegisterSerializer, UserSerializer,
    ProjectSerializer, TaskSerializer,
    ActivityLogSerializer
)
from .permissions import IsRoleAdmin, IsAdminOrReadOnly, IsContributor


# ---------------------------
# User Registration & Me View
# ---------------------------

class RegisterView(APIView):
    def post(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({'message': 'User registered successfully'}, status=201)
        return Response(serializer.errors, status=400)


class MeView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        user = request.user
        return Response({
            'username': user.username,
            'email': user.email,
            'role': user.role,
        })


# ---------------------------
# User Management (Admin Only)
# ---------------------------

class UserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsRoleAdmin]


# ---------------------------
# Project Management
# ---------------------------

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAdminOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)


# ---------------------------
# Task Management
# ---------------------------

class TaskViewSet(viewsets.ModelViewSet):
    queryset = Task.objects.all()
    serializer_class = TaskSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'admin':
            return Task.objects.filter(is_deleted=False)
        return Task.objects.filter(assigned_to=user, is_deleted=False)

    def perform_destroy(self, instance):
        instance.is_deleted = True
        instance.save()

    def update(self, request, *args, **kwargs):
        instance = self.get_object()
        user = request.user

        # Contributor can only update status
        if user.role == 'contributor':
            update_data = {}
            if 'status' in request.data:
                update_data['status'] = request.data['status']
            else:
                return Response(
                    {"detail": "Contributors are only allowed to update task status."},
                    status=status.HTTP_403_FORBIDDEN
                )

            serializer = self.get_serializer(instance, data=update_data, partial=True)
            serializer.is_valid(raise_exception=True)
            self.perform_update(serializer)
            return Response(serializer.data)

        # Admin can update everything
        return super().update(request, *args, **kwargs)

    @action(detail=False, methods=['get'], url_path='filter-tasks')
    def filter_tasks(self, request):
        now = timezone.now().date()
        upcoming = now + timedelta(days=2)
        yesterday = now - timedelta(days=1)

        due_soon = Task.objects.filter(due_date__lte=upcoming, due_date__gte=now, is_deleted=False)
        overdue = Task.objects.filter(due_date__lt=now, status__in=['todo', 'in_progress'], is_deleted=False)
        recent_done = Task.objects.filter(status='done', created_at__gte=yesterday, is_deleted=False)

        return Response({
            'due_soon': TaskSerializer(due_soon, many=True).data,
            'overdue': TaskSerializer(overdue, many=True).data,
            'recently_completed': TaskSerializer(recent_done, many=True).data
        })


# ---------------------------
# Activity Logs (Admin Only)
# ---------------------------

class ActivityLogViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ActivityLog.objects.all()
    serializer_class = ActivityLogSerializer
    permission_classes = [IsRoleAdmin]
