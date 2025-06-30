from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    ROLE_CHOICES = (
        ('admin', 'Admin'),
        ('contributor', 'Contributor'),
    )
    role = models.CharField(max_length=20, choices=ROLE_CHOICES)


class Project(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)

class Task(models.Model):
    STATUS_CHOICES = (
        ('todo', 'Todo'),
        ('in_progress', 'In Progress'),
        ('done', 'Done'),
    )
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    description = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    due_date = models.DateField()
    created_at = models.DateTimeField(auto_now_add=True)
    assigned_to = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    is_deleted = models.BooleanField(default=False)

class ActivityLog(models.Model):
    task = models.OneToOneField(Task, on_delete=models.CASCADE)
    previous_assignee = models.ForeignKey(User, on_delete=models.SET_NULL, null=True, related_name='prev_assignee')
    previous_status = models.CharField(max_length=20)
    previous_due_date = models.DateField(null=True, blank=True)
