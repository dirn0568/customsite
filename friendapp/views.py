from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView

from accountapp.models import User
from friendapp.models import FriendModel

class CreateFriendView(CreateView):
    model = FriendModel

def createfriendview(request, word1, word2):
    friend1 = User.objects.filter(username=word1)
    friend2 = User.objects.filter(username=word2)
    # temp_comment = FriendModel.save(commit=False)
    # for friend_list in A:
    #     temp_comment.A_User = friend_list
    # for friend_list in B:
    #     temp_comment.B_User = friend_list
    # temp_comment.save()
    for friend_list in friend1:
        for friend_list2 in friend2:
            FriendModel(A_User=friend_list, B_User=friend_list2).save()