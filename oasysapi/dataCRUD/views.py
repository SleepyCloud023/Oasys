import json

from django.http.response import JsonResponse
from django.contrib.auth.models import User
from rest_framework import status
from rest_framework.decorators import api_view

from dataCRUD.models import ImageMetadata, Dataset, DatasetPermission
from utils.timer import timer


@api_view(['GET', 'POST', 'DELETE'])
def data(request, id):
    # find tutorial by pk (id)
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
                                                  "imageName": row.image_name, "imageSize": row.image_size})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})


@api_view(['GET', 'PUT', 'DELETE'])
@timer
def dataset_permission(request, id):
    try:
        target = User.objects.get(pk=id)
    except ImageMetadata.DoesNotExist:
        return JsonResponse({'message': 'user not found'}, status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        result_json = {"userName": "root", "dataset": []}

        permission = DatasetPermission.objects.filter(
            user=id).values('dataset')

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
        result_json = {"userName": "root", "dataset": []}

        targets = Dataset.objects.filter(user=id)
        for row in targets:
            result_json["dataset"].append({"id": row.id, "name": row.name})

        return JsonResponse(result_json, json_dumps_params={'indent': 2})
