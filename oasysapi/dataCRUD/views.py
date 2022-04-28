import json
from PIL import Image
import io
import os

from django.http import HttpResponse
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view

from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import CustomUser as User, UserWorkspace
from common.models import Workspace
from utils.timer import timer


DEFAULT_ANNO = json.dumps(
    {"category_list": [], "tag_list": [], "box_object_list": []})


@api_view(['GET', 'POST', 'DELETE'])
def data(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: _description_
    """
    try:
        target = ImageMetadata.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'success': False}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        anno_str = target.annotation
        anno_json = json.loads(anno_str)
        result_json = {"imageURL": target.image_url, "imageName": target.image_name,
                       "imageSize": target.image_size, "annotation": anno_json}

        return JsonResponse(result_json, json_dumps_params={'indent': 2})

    elif request.method == "POST":
        result_json = {"success": True}

        anno_str = request.body.decode("utf-8")
        target.annotation = anno_str
        target.save()

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT', 'DELETE'])
def dataset(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: check111
    """
    try:
        target = Dataset.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'dataset not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result_json = {"datasetName": "", "image_metadata": []}

        result_json["datasetName"] = target.name
        targets = ImageMetadata.objects.filter(dataset=id)
        for row in targets:
            result_json["image_metadata"].append({"id": row.id, "imageURL": row.image_url,
                                                  "imageName": row.image_name, "imageSize": row.image_size, "modification_date": row.modification_date})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT', 'DELETE'])
# @timer
def workspace(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: _description_
    """
    try:
        target = Workspace.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result_json = {"workspace": id, "dataset": []}

        permission = WorkspaceDataset.objects.filter(
            workspace=id).values('dataset')

        targets = Dataset.objects.filter(
            id__in=permission)
        for row in targets:
            result_json["dataset"].append({"id": row.id, "name": row.name})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT', 'DELETE'])
def user(request, id):
    try:
        target = User.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result_json = {"userName": target.username, "workspace": []}

        workspace_list = UserWorkspace.objects.filter(
            user=id).values('workspace')

        targets = Workspace.objects.filter(id__in=workspace_list)
        for row in targets:
            result_json["workspace"].append(
                {"id": row.id, "name": row.workspace_name})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['POST', 'DELETE'])
def image(request, id):
    if request.method == 'POST':
        try:
            dataset, name = request.headers['Filepath'].split("/")
            image = Image.open(io.BytesIO(request.body))
            width = image.width
            height = image.height
            filename = image.filename
            file_loc = 'img/'+dataset + "/" + name
            print("check !!! -------------")
            print(file_loc)

            with open(file_loc, 'wb') as f:
                f.write(request.body)

            ImageMetadata.objects.create(annotation=DEFAULT_ANNO, image_url="https://oasys.ml/res/" +
                                         file_loc, image_name=name, image_size=str(width)+" "+str(height), dataset_id=dataset)

            return JsonResponse({"type": "image_upload", "success": True}, json_dumps_params={'indent': 2})

        except Exception as e:
            print(e)
            return JsonResponse({"type": "image_upload", "success": False, "error_msg": e}, json_dumps_params={'indent': 2})

    elif request.method == 'DELETE':
        try:
            target = ImageMetadata.objects.get(pk=id)
        except:
            return JsonResponse({"type": "image_delete", "success": False}, json_dumps_params={'indent': 2})

        dataset = target.dataset_id
        filename = target.image_name

        file_loc = 'img/' + str(dataset) + "/" + filename
        if os.path.isfile(file_loc):
            os.remove(file_loc)

        target.delete()

        return JsonResponse({"type": "image_delete", "success": True}, json_dumps_params={'indent': 2})


@api_view(['GET', 'POST'])
def annotation(request, id):
    try:
        target = Dataset.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'type': "annotation_"+request.method, 'success': False, 'error_msg': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result = []

        targets = ImageMetadata.objects.filter(dataset=id)
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
