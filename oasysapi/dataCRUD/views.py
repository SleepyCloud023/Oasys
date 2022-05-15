import json
from tabnanny import filename_only
from PIL import Image
import io
import os

from django.http import HttpResponse
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view

from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import CustomUser as User, UserWorkspace, Workspace
from utils.timer import timer
from .forms import ImgForm
from .permission import data_check, dataset_check, workspace_check

from modules.delete_data import delete_dataset, delete_workspace


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
    print('check ------------')
    try:
        target = ImageMetadata.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'success': False}, status=status.HTTP_404_NOT_FOUND)

    user = request.session.get('user')
    if user is None:
        return JsonResponse({'type': 'data_get', 'success': False}, status=status.HTTP_401_UNAUTHORIZED)

    permission_flag = data_check(user, target)
    if not permission_flag:
        return JsonResponse({'type': 'data_get', 'success': False}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        anno_str = target.annotation
        anno_json = json.loads(anno_str)
        result_json = {"success": True, "imageURL": target.image_url, "imageName": target.image_name,
                       "imageSize": target.image_size, "annotation": anno_json}

        return JsonResponse(result_json, json_dumps_params={'indent': 2})

    elif request.method == "POST":
        result_json = {"success": True}

        anno_str = request.body.decode("utf-8")
        target.annotation = anno_str
        target.save()

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['GET', 'POST', 'DELETE'])
def dataset(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: check111
    """
    if request.method == "POST":
        submit = json.loads(request.body.decode("utf-8"))

        same_name = Dataset.objects.filter(name=submit["name"])
        if len(same_name) >= 1:
            return JsonResponse({"type": "dataset_create", "success": False, "error_msg": "The name already exists."},
                                json_dumps_params={'indent': 2})

        target = Dataset.objects.create(name=submit["name"])
        WorkspaceDataset.objects.create(
            workspace=submit["workspace"], dataset=target.id)

        directory = "img/" + str(target.id)
        if not os.path.exists(directory):
            os.makedirs(directory)

        return JsonResponse({"type": "dataset_create", "success": True},
                            json_dumps_params={'indent': 2})

    try:
        target = Dataset.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'dataset not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.session.get('user')
    if user is None:
        return JsonResponse({'type': 'dataset_get', 'success': False}, status=status.HTTP_401_UNAUTHORIZED)

    permission_flag = dataset_check(user, target)
    if not permission_flag:
        return JsonResponse({'type': 'dataset_get', 'success': False}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        result_json = {"datasetName": "", "image_metadata": []}

        result_json["datasetName"] = target.name
        targets = ImageMetadata.objects.filter(dataset=id)
        for row in targets:
            mf_time = row.modification_date.strftime(
                'Last modified on %Y-%m-%d  %H:%M:%S (KST:UTC+9)')
            result_json["image_metadata"].append({"id": row.id, "imageURL": row.image_url,
                                                  "imageName": row.image_name, "imageSize": row.image_size, "modification_date": mf_time})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})

    elif request.method == "DELETE":
        delete_dataset(target)

        return JsonResponse({"type": "dataset_delete", "success": True}, json_dumps_params={'indent': 2})


@api_view(['GET', 'POST', 'DELETE'])
# @timer
def workspace(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: _description_
    """
    if request.method == "POST":
        submit = json.loads(request.body.decode("utf-8"))
        submit_user = submit["user"].replace('-', "")

        same_name = Workspace.objects.filter(workspace_name=submit["name"])
        if len(same_name) >= 1:
            return JsonResponse({"type": "workspace_create", "success": False, "error_msg": "The name already exists."},
                                json_dumps_params={'indent': 2})

        target = Workspace.objects.create(workspace_name=submit["name"])
        UserWorkspace.objects.create(
            user=submit_user, workspace=target.id)

        return JsonResponse({"type": "workspace_create", "success": True},
                            json_dumps_params={'indent': 2})

    try:
        target = Workspace.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    user = request.session.get('user')
    if user is None:
        return JsonResponse({'type': 'workspace_get', 'success': False}, status=status.HTTP_401_UNAUTHORIZED)

    permission_flag = workspace_check(user, target)
    if not permission_flag:
        return JsonResponse({'type': 'workspace_get', 'success': False}, status=status.HTTP_403_FORBIDDEN)

    if request.method == 'GET':
        result_json = {"workspace": id, "dataset": []}

        permission = WorkspaceDataset.objects.filter(
            workspace=id).values('dataset')

        targets = Dataset.objects.filter(
            id__in=permission)
        for row in targets:
            mf_time = row.modification_date.strftime(
                '%Y-%m-%d  %H:%M:%S (Last modified)')
            result_json["dataset"].append(
                {"id": row.id, "name": row.name, "modification_date": mf_time})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})

    elif request.method == "DELETE":
        delete_workspace(target)

        return JsonResponse({"type": "dataset_delete", "success": True}, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT', 'DELETE'])
def permission(request, id):
    id = id.replace('-', "")
    try:
        target = User.objects.get(pk=id)
        print(target.id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result_json = {"user": target.username, "workspace": []}

        workspace_list = UserWorkspace.objects.filter(
            user=id).values('workspace')

        targets = Workspace.objects.filter(id__in=workspace_list)
        for row in targets:
            mf_time = row.modification_date.strftime(
                '%Y-%m-%d %H:%M:%S')
            result_json["workspace"].append(
                {"id": row.id, "name": row.workspace_name, "modification_date": mf_time})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['POST', 'DELETE'])
def image(request, id):
    if request.method == 'POST':
        try:
            titles = request.POST.getlist('title')
            files = request.FILES.getlist('file')

            form = ImgForm(request.POST, request.FILES)
            print(files)
            if form.is_valid():
                for i, filename in enumerate(titles):
                    image = files[i]
                    image = Image.open(image)
                    width = image.width
                    height = image.height

                    file_loc = 'img/' + str(id) + "/" + filename

                    image.save(file_loc)
                    ImageMetadata.objects.create(annotation=DEFAULT_ANNO, image_url="https://oasys.ml/res/" +
                                                 file_loc, image_name=filename, image_size=str(width)+" "+str(height), dataset_id=id)

            return JsonResponse({"type": "image_upload", "success": True}, json_dumps_params={'indent': 2})

        except Exception as e:
            print(e)
            return JsonResponse({"type": "image_upload", "success": False, "error_msg": str(e)}, json_dumps_params={'indent': 2})

    elif request.method == 'DELETE':
        try:
            target = ImageMetadata.objects.get(pk=id)
        except:
            return JsonResponse({"type": "image_delete", "success": False}, json_dumps_params={'indent': 2})

        dataset = target.dataset_id
        filename = target.image_name

        same_name = ImageMetadata.objects.filter(image_name=filename)

        if len(same_name) <= 1:
            file_loc = 'img/' + str(dataset) + "/" + filename
            if os.path.isfile(file_loc):
                os.remove(file_loc)

        target.delete()

        return JsonResponse({"type": "image_delete", "success": True}, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT'])
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
