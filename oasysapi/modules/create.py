from PIL import Image
import json
import os

from django.conf import settings
from django.db import transaction
from django.http.response import JsonResponse

from dataCRUD.forms import ImgForm
from dataCRUD.models import ImageMetadata, Dataset, WorkspaceDataset
from common.models import UserWorkspace, Workspace

from modules.annotation import DEFAULT_ANNO

IMG_DIR_PATH = getattr(settings, 'IMG_DIR_PATH', None)


def create_image(request, target):
    try:
        titles = request.POST.getlist('title')
        files = request.FILES.getlist('file')

        form = ImgForm(request.POST, request.FILES)
        if form.is_valid():
            for i, filename in enumerate(titles):
                image = files[i]
                image = Image.open(image)
                width = image.width
                height = image.height

                file_loc = IMG_DIR_PATH + str(target.id) + "/" + filename
                url_loc = str(target.id) + "/" + filename

                image.save(file_loc)
                ImageMetadata.objects.create(annotation=DEFAULT_ANNO, image_url="https://oasys.ml/res/img/" +
                                             url_loc, image_name=filename, image_size=str(width)+" "+str(height), dataset_id=target.id)

        return JsonResponse({"type": "image_upload", "success": True}, json_dumps_params={'indent': 2})

    except Exception as e:
        print(e)
        return JsonResponse({"type": "image_upload", "success": False, "error_msg": str(e)}, json_dumps_params={'indent': 2})


def create_dataset(request, target):
    submit = json.loads(request.body.decode("utf-8"))

    try:
        with transaction.atomic():
            same_name = Dataset.objects.filter(name=submit["name"])
            if len(same_name) >= 1:
                return JsonResponse({"type": "dataset_create", "success": False, "error_msg": "The name already exists."},
                                    json_dumps_params={'indent': 2})

            new_dataset = Dataset.objects.create(
                name=submit["name"], local_flag=0)
            WorkspaceDataset.objects.create(
                workspace=target.id, dataset=new_dataset.id)

        directory = IMG_DIR_PATH + str(target.id)
        if not os.path.exists(directory):
            os.makedirs(directory)

        return JsonResponse({"type": "dataset_create", "success": True},
                            json_dumps_params={'indent': 2})
    except Exception as e:
        return JsonResponse({"type": "dataset_create", "success": False, "error_msg": str(e)}, json_dumps_params={'indent': 2})


def create_workspace(request, target):
    submit = json.loads(request.body.decode("utf-8"))

    try:
        with transaction.atomic():
            same_name = Workspace.objects.filter(workspace_name=submit["name"])
            if len(same_name) >= 1:
                return JsonResponse({"type": "workspace_create", "success": False, "error_msg": "The name already exists."},
                                    json_dumps_params={'indent': 2})

            new_workspace = Workspace.objects.create(
                workspace_name=submit["name"])
            UserWorkspace.objects.create(
                user=target.id, workspace=new_workspace.id)

        return JsonResponse({"type": "workspace_create", "success": True},
                            json_dumps_params={'indent': 2})
    except Exception as e:
        return JsonResponse({"type": "workspace_create", "success": False, "error_msg": str(e)}, json_dumps_params={'indent': 2})
