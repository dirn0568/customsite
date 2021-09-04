from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView

from friendapp.models import FriendModel

class CreateFriendView(CreateView):
    model = FriendModel