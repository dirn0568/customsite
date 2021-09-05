
from django.contrib import admin
from django.urls import path, include

from friendapp import views
from friendapp.views import CreateFriendView

app_name = 'friendapp'

urlpatterns = [
    path('create_friend/<word1>/<word2>', views.createfriendview, name='create_friend'),
]