from django.contrib.auth.models import User

while 1:
    username = input("username : ")
    password = input("password : ")
    email = input("email : ")
    confirm = input("confirm (Y/N) : ")

    if confirm == "Y":
        user = User.objects.create_user(username=username,
                                        password=password,
                                        email=email
                                        )

    next_user = input("add more user (Y/N) : ")
    if next_user != "Y":
        break
