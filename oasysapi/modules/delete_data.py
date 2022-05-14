import os
import shutil

from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import CustomUser as User, UserWorkspace, Workspace


def delete_dataset(id, target):
    workspace_dataset = WorkspaceDataset.objects.filter(dataset=id)
    workspace_dataset.delete()

    data_list = ImageMetadata.objects.filter(dataset=id)
    for row in data_list:
        row.delete()

    directory = "img/" + str(id)
    if os.path.exists(directory):
        shutil.rmtree(directory)

    target.delete()
