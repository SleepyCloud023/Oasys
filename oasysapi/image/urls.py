from django.urls import path
from image import views

urlpatterns = [
    path('img/<str:image_file>', views.image),
]
