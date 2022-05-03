from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import CustomUser as User, UserWorkspace, Workspace


def data_check(user, target):
    session_user = user['id'].replace('-', '')

    workspace_id = WorkspaceDataset.objects.filter(
        dataset=target.dataset_id).values('workspace')
    users = UserWorkspace.objects.filter(
        workspace__in=workspace_id).values('user')

    for user in users:
        if user['user'] == session_user:
            return True

    return False


def dataset_check(user, target):
    session_user = user['id'].replace('-', '')

    workspace_id = WorkspaceDataset.objects.filter(
        dataset=target.id).values('workspace')
    users = UserWorkspace.objects.filter(
        workspace__in=workspace_id).values('user')

    for user in users:
        if user['user'] == session_user:
            return True

    return False


def workspace_check(user, target):
    session_user = user['id'].replace('-', '')

    users = UserWorkspace.objects.filter(
        workspace=target.id).values('user')

    for user in users:
        if user['user'] == session_user:
            return True

    return False
