import json

from django.http.response import JsonResponse
from django.contrib.auth import authenticate
from rest_framework.decorators import api_view

from common.models import CustomUser as User
from common.services import oauth_user_get
from auth.services import google_validate_id_token


@api_view(['GET', 'POST', 'DELETE'])
def login(request):\

    """_summary_

    Args:
        request (_type_): _description_

    Returns:
        _type_: _description_
    """

    if request.method == "GET":
        result = {}
        user = request.session.get('user')

        if user is None:
            result = {"login": False}
        else:
            result = {"login": True,
                      "username": user["username"], "id": user["id"]}
        return JsonResponse(result, json_dumps_params={'indent': 2})

    elif request.method == "POST":
        result = {}

        login_req = json.loads(request.body.decode("utf-8"))
        username, password = login_req["username"], login_req["password"]

        user = authenticate(username=username, password=password)
        if user is None:
            result = {"login": False,
                      "error_msg": "invalid ID or Password"}
        else:
            request.session.clear()
            target_user = User.objects.filter(username=username).first()

            request.session['user'] = {
                "username": username, "id": str(target_user.id)}
            result = {"login": True, "username": username,
                      "id": str(target_user.id)}
        return JsonResponse(result, json_dumps_params={'indent': 2})

    elif request.method == "DELETE":
        request.session.flush()
        response = JsonResponse(
            {"logout": True}, json_dumps_params={'indent': 2})
        # response.delete_cookie('sessionid')
        return response


@api_view(['POST'])
def oauth_init(request):
    result = {}

    id_token = request.headers.get('Authorization')
    data = json.loads(request.body.decode("utf-8"))

    try:
        google_validate_id_token(id_token=id_token)
        result = oauth_user_get(request, data)
    except Exception as e:
        print(e)
        result = {"login": False}

    return JsonResponse(result, json_dumps_params={'indent': 2})
