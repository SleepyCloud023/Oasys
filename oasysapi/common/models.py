import uuid
from django.db import models
from django.contrib.auth.models import AbstractUser


class CustomUser(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    oauth_flag = models.IntegerField(blank=True, null=True)


class UserWorkspace(models.Model):
    user = models.CharField(max_length=32, blank=True, null=True)
    workspace = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_workspace'


class Workspace(models.Model):
    workspace_name = models.CharField(max_length=150, blank=True, null=True)
    creation_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)
    modification_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'workspace'
