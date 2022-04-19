from django.contrib.auth.models import User
user = User.objects.create_user(username='john',
                                email='jlennon@beatles.com',
                                password='glass onion')


"""changing password
u = User.objects.get(username='john')
u.set_password('new password')
u.save()
"""
