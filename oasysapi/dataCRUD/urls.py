from email.mime import image
from django.urls import path
from dataCRUD import views

urlpatterns = [
    path('image_metadata/<int:id>', views.data),
    path('dataset/<int:id>', views.dataset),
    path('workspace/<int:id>', views.workspace),
    path('user/<str:id>', views.user),
    path('image/<int:id>', views.image),
    path('annotation/<int:id>', views.annotation)
]
