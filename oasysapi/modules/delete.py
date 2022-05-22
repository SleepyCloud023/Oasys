import os
import shutil

from django.conf import settings

from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import CustomUser as User, UserWorkspace, Workspace

IMG_DIR_PATH = getattr(settings, 'IMG_DIR_PATH', None)


def delete_dataset(target):
    id = target.id
    workspace_dataset = WorkspaceDataset.objects.filter(dataset=id)
    workspace_dataset.delete()

    data_list = ImageMetadata.objects.filter(dataset=id)
    for row in data_list:
        row.delete()

    directory = IMG_DIR_PATH + str(id)
    if os.path.exists(directory):
        shutil.rmtree(directory)

    target.delete()


def delete_workspace(target):
    id = target.id
    user_workspace = UserWorkspace.objects.filter(workspace=id)
    user_workspace.delete()

    workspace_dataset = WorkspaceDataset.objects.filter(
        workspace=id)
    dataset_list = Dataset.objects.filter(
        id__in=workspace_dataset.values('dataset'))

    for row in dataset_list:
        same_name = WorkspaceDataset.objects.filter(
            dataset=id).values('dataset')

        flag = 1
        for srow in same_name:
            if srow.workspace != id:
                flag = 0
                break
        if flag:
            delete_dataset(row)

    workspace_dataset.delete()
    target.delete()
