# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class Dataset(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    user_id = models.IntegerField(blank=True, null=True)
    creation_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)
    modification_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)
    rep_image = models.CharField(
        max_length=300, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'dataset'


class ImageMetadata(models.Model):
    annotation = models.JSONField(blank=True, null=True)
    image_url = models.CharField(max_length=300, blank=True, null=True)
    image_name = models.CharField(max_length=50, blank=True, null=True)
    image_size = models.CharField(max_length=30, blank=True, null=True)
    dataset = models.ForeignKey(
        Dataset, models.DO_NOTHING, blank=True, null=True)
    size = models.CharField(max_length=20, blank=True, null=True)
    creation_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)
    modification_date = models.DateTimeField(
        blank=True, null=True, auto_now_add=True)

    class Meta:
        managed = False
        db_table = 'image_metadata'


class WorkspaceDataset(models.Model):
    workspace = models.IntegerField(blank=True, null=True)
    dataset = models.IntegerField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'workspace_dataset'
