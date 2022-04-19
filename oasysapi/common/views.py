import json

from django.http.response import JsonResponse
from django.contrib.auth import authenticate
from django.contrib.auth.models import User
from rest_framework.decorators import api_view


@api_view(['GET', 'POST', 'DELETE'])
def login(request):
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
                "username": username, "id": target_user.id}
            result = {"login": True, "username": username,
                      "id": target_user.id}

        return JsonResponse(result, json_dumps_params={'indent': 2})

    elif request.method == "DELETE":
        request.session.clear()
        return JsonResponse({"logout": True}, json_dumps_params={'indent': 2})
