from django.http.response import JsonResponse
from rest_framework import status

from dataCRUD.permission import data_check, dataset_check, workspace_check


def check_user(request, target, type):
    # check if user have session
    user = request.session.get('user')
    if user is None:
        return JsonResponse({'type': 'data_get', 'success': False}, status=status.HTTP_401_UNAUTHORIZED)

    # check if user has permissions on the target.
    permission_flag = False
    if type == "data":
        permission_flag = data_check(user, target)
    elif type == "dataset":
        permission_flag = dataset_check(user, target)
    elif type == "workspace":
        permission_flag = workspace_check(user, target)

    if not permission_flag:
        return JsonResponse({'type': 'data_get', 'success': False}, status=status.HTTP_403_FORBIDDEN)

    return True
