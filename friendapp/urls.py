
from django.contrib import admin
from django.urls import path, include

from friendapp.views import CreateFriendView

app_name = 'friendapp'

urlpatterns = [
    path('create_friend', CreateFriendView.as_view(), name='create_friend'),
]