from django.urls import path, include

from messageapp import views
from messageapp.views import test

app_name = 'messageapp'

urlpatterns = [
    path('message_box/<int:pk>', views.test, name='message_box'),
]