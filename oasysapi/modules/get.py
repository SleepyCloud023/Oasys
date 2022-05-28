import json

from django.http import HttpResponse
from django.http.response import JsonResponse

from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import UserWorkspace, Workspace


def get_data(target):
    anno_str = target.annotation
    anno_json = json.loads(anno_str)
    result_json = {"success": True, "imageURL": target.image_url, "imageName": target.image_name,
                   "imageSize": target.image_size, "annotation": anno_json}

    return JsonResponse(result_json, json_dumps_params={'indent': 2})


def get_annotation(target):
    result = []

    targets = ImageMetadata.objects.filter(dataset=target.id)
    for index, row in enumerate(targets):
        anno_json = json.loads(row.annotation)
        anno_json["_image_num"] = index
        anno_json["_image_name"] = row.image_name
        result.append(anno_json)

    result = json.dumps(result, indent=2, sort_keys=True)

    response = HttpResponse(
        result, content_type='text/json')
    response['Content-Disposition'] = 'attachment; filename=' + \
        target.name+'.json'

    return response


def get_dataset(target):
    result_json = {"datasetName": "", "image_metadata": []}

    result_json["datasetName"] = target.name
    targets = ImageMetadata.objects.filter(dataset=target.id)
    for row in targets:
        mf_time = row.modification_date.strftime(
            'Last modified on %Y-%m-%d  %H:%M:%S (KST:UTC+9)')
        result_json["image_metadata"].append({"id": row.id, "imageURL": row.image_url,
                                              "imageName": row.image_name, "imageSize": row.image_size, "modification_date": mf_time})

    return JsonResponse(result_json, json_dumps_params={'indent': 2})


def get_workspace(target):
    result_json = {"workspace": target.id, "dataset": []}

    permission = WorkspaceDataset.objects.filter(
        workspace=target.id).values('dataset')

    targets = Dataset.objects.filter(
        id__in=permission)
    for row in targets:
        mf_time = row.modification_date.strftime(
            '%Y-%m-%d  %H:%M:%S (Last modified)')
        result_json["dataset"].append(
            {"id": row.id, "name": row.name, "modification_date": mf_time})

    return JsonResponse(result_json, json_dumps_params={'indent': 2})


def get_permission(target):
    result_json = {"user": target.username, "workspace": []}

    workspace_list = UserWorkspace.objects.filter(
        user=target.id).values('workspace')

    targets = Workspace.objects.filter(id__in=workspace_list)
    for row in targets:
        mf_time = row.modification_date.strftime(
            '%Y-%m-%d %H:%M:%S')
        result_json["workspace"].append(
            {"id": row.id, "name": row.workspace_name, "modification_date": mf_time})

    return JsonResponse(result_json, json_dumps_params={'indent': 2})

# a3dcf03c-aaa4-4884-91fe-a63113f20452
