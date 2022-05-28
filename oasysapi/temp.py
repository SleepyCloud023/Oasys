# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class CommonCustomuser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.IntegerField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.IntegerField()
    is_active = models.IntegerField()
    date_joined = models.DateTimeField()
    id = models.CharField(primary_key=True, max_length=32)
    oauth_flag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'common_customuser'


class CommonCustomuserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    customuser = models.ForeignKey(CommonCustomuser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'common_customuser_groups'
        unique_together = (('customuser', 'group'),)


class CommonCustomuserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    customuser = models.ForeignKey(CommonCustomuser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'common_customuser_user_permissions'
        unique_together = (('customuser', 'permission'),)


class Dataset(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user = models.CharField(max_length=32, blank=True, null=True)
    creation_date = models.DateTimeField(blank=True, null=True)
    modification_date = models.DateTimeField(blank=True, null=True)
    rep_image = models.CharField(max_length=300, blank=True, null=True)
    local_flag = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dataset'


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.PositiveSmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(CommonCustomuser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class ImageMetadata(models.Model):
    annotation = models.JSONField(blank=True, null=True)
    image_url = models.CharField(max_length=300, blank=True, null=True)
    image_name = models.CharField(max_length=50, blank=True, null=True)
    image_size = models.CharField(max_length=30, blank=True, null=True)
    dataset = models.ForeignKey(Dataset, models.DO_NOTHING, blank=True, null=True)
    size = models.CharField(max_length=20, blank=True, null=True)
    creation_date = models.DateTimeField(blank=True, null=True)
    modification_date = models.DateTimeField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'image_metadata'


class UserWorkspace(models.Model):
    user = models.CharField(max_length=32, blank=True, null=True)
    workspace = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'user_workspace'


class Workspace(models.Model):
    workspace_name = models.CharField(max_length=150, blank=True, null=True)
    creation_date = models.DateTimeField(blank=True, null=True)
    modification_date = models.DateTimeField(blank=True, null=True)
    user = models.CharField(max_length=32, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'workspace'


class WorkspaceDataset(models.Model):
    workspace = models.IntegerField(blank=True, null=True)
    dataset = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'workspace_dataset'
