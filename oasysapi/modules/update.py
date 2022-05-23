from django.http.response import JsonResponse


def update_anno(request, target):
    result_json = {"success": True}

    anno_str = request.body.decode("utf-8")
    target.annotation = anno_str
    target.save()

    return JsonResponse(result_json, json_dumps_params={'indent': 2})
