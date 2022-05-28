import json
from PIL import Image
import os

from django.conf import settings
from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view

from dataCRUD.models import ImageMetadata, Dataset
from common.models import CustomUser as User, Workspace
from utils.timer import timer

from modules.check_user import check_user
from modules.create import create_image, create_dataset, create_workspace
from modules.delete import delete_image, delete_dataset, delete_workspace
from modules.get import get_data, get_dataset, get_workspace, get_permission, get_annotation
from modules.update import update_anno

IMG_DIR_PATH = getattr(settings, 'IMG_DIR_PATH', None)


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
        return JsonResponse({'type': "data_"+request.method, 'success': False, 'error_msg': 'data not found'}, status=status.HTTP_404_NOT_FOUND)

    ucheck_result = check_user(request, target, "data")
    if ucheck_result is not True:
        return ucheck_result

    if request.method == 'GET':
        return get_data(target)

    elif request.method == "POST":
        return update_anno(request, target)

    elif request.method == 'DELETE':
        return delete_image(target)


@api_view(['GET'])
def annotation(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: _description_
    """
    try:
        target = Dataset.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'type': "annotation_"+request.method, 'success': False, 'error_msg': 'dataset not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return get_annotation(target)


@api_view(['GET', 'POST', 'DELETE'])
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
        return JsonResponse({'type': "dataset_"+request.method, 'success': False, 'error_msg': 'dataset not found'}, status=status.HTTP_404_NOT_FOUND)

    ucheck_result = check_user(request, target, "dataset")
    if ucheck_result is not True:
        return ucheck_result

    if request.method == 'GET':
        return get_dataset(target)

    if request.method == 'POST':
        return create_image(request, target)

    elif request.method == "DELETE":
        return delete_dataset(target, "response")


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
    try:
        target = Workspace.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'type': "workspace_"+request.method, 'success': False, 'error_msg': 'workspace not found'}, status=status.HTTP_404_NOT_FOUND)

    ucheck_result = check_user(request, target, "workspace")
    if ucheck_result is not True:
        return ucheck_result

    if request.method == 'GET':
        return get_workspace(target)

    if request.method == "POST":
        return create_dataset(request, target)

    elif request.method == "DELETE":
        return delete_workspace(target)


@api_view(['GET', 'POST', 'DELETE'])
def permission(request, id):
    """_summary_

    Args:
        request (_type_): _description_
        id (_type_): _description_

    Returns:
        _type_: _description_
    """
    #id = id.replace('-', "")
    try:
        target = User.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'type': "permission_"+request.method, 'success': False, 'error_msg': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        return get_permission(target)

    if request.method == "POST":
        return create_workspace(request, target)
