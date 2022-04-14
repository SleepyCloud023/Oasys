from django.urls import path
from dataCRUD import views

urlpatterns = [
    path('image_metadata/<int:id>', views.data),
    path('dataset/<int:id>', views.dataset),
    path('dataset_permission/<int:id>', views.dataset_permission),
    path('user/<int:id>', views.user),
    path('login', views.login),
]
