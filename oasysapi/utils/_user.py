from common.models import CustomUser as User


def create(name, email, password):
    user = User.objects.create_user(username=name,
                                    email=email,
                                    password=password)

    print("Success!")


"""changing password
u = User.objects.get(username='john')
u.set_password('new password')
u.save()
"""
