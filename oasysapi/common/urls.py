from django.urls import path
from common import views

urlpatterns = [
    path('user', views.login),
    path('oauth', views.oauth_init),
]
