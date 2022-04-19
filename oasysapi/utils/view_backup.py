"""image server
def image(request, image_file):
    file_location = 'img/'+image_file

    try:
        with open(file_location, 'rb') as f:
            file_data = f.read()

        response = HttpResponse(file_data, content_type='image/png')
        response['Content-Disposition'] = 'inline; filename='+image_file

    except IOError:
        response = HttpResponseNotFound('<h1>File not exist</h1>')

    return response
"""

"""Login
@api_view(['GET', 'POST', 'DELETE'])
def login(request):
    if request.method == "GET":
        result = {}
        user_id = request.session.get('id')

        if user_id is None:
            result = {"login": False}
        else:
            result = {"login": True,
                      "username": user_id["username"], "id": user_id["id"]}
        return JsonResponse(result, json_dumps_params={'indent': 2})

    elif request.method == "POST":
        result = {"success": True}

        login_req = json.loads(request.body.decode("utf-8"))
        target_user = User.objects.filter(
            login_id=login_req["username"]).first()
        if target_user is None:
            result = {"success": False,
                      "error_msg": "invalid ID or Password"}
        elif not check_password_hash(target_user.login_password, login_req["password"]):
            result = {"success": False,
                      "error_msg": "invalid ID or Password"}
        else:
            request.session.clear()
            request.session['id'] = {"id": target_user.id,
                                     "username": target_user.login_id}
            result['uername'] = login_req["username"]
        return JsonResponse(result, json_dumps_params={'indent': 2})

    elif request.method == "DELETE":
        request.session.clear()
        return JsonResponse({"logout": True}, json_dumps_params={'indent': 2})
"""

""" basic authentication
@api_view(['POST'])
def example_view(request, format=None):
    # print(request.META['HTTP_AUTHORIZATION'])
    print("check")
    content = {
        'user': str(request.user),  # `django.contrib.auth.User` instance.
        'auth': str(request.auth),  # None
    }
    return Response(content)
"""