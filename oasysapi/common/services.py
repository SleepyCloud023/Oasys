from common.models import CustomUser as User


def oauth_user_get(request, data):
    result = {}

    target_user = User.objects.filter(
        email=data["email"], oauth_flag=True).first()
    if target_user is None:
        print('new user !!')
        User.objects.create_user(username=data["first_name"]+data["last_name"],
                                 email=data["email"],
                                 oauth_flag=True,
                                 first_name=data["first_name"],
                                 last_name=data["last_name"])

        target_user = User.objects.filter(
            email=data["email"], oauth_flag=True).first()

    request.session.clear()
    request.session['user'] = {
        "username": data["first_name"]+data["last_name"], "id": str(target_user.id)}
    result = {"login": True, "username": data["first_name"]+data["last_name"],
              "id": str(target_user.id)}

    return result
