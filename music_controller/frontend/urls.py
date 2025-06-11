from django.urls import path
from .views import index, privacy_policy

app_name = 'frontend'

urlpatterns = [
    path('', index, name=''),
    path('info/',index),
    path('join/',index),
    path('create/',index),
    path('room/<str:roomCode>', index),
    path('privacy-policy/', privacy_policy, name='privacy-policy')
]
