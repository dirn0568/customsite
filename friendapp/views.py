from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView

from accountapp.models import User, Friend_List
from friendapp.models import FriendRequestModel

def createfriendview(request, word1, word2):
    friend1 = User.objects.filter(username=word1)
    friend2 = User.objects.filter(username=word2)
    for friend_list in friend1:
        for friend_list2 in friend2:
            FriendRequestModel(A_User=friend_list, B_User=friend_list2).save()

def detailfriendview(request, pk):
    test2 = User.objects.filter(pk=pk)
    for testing2 in test2:
        test = Friend_List.objects.filter(friend=testing2)
    context = {}
    context['테스트중'] = test
    return render(request, 'friend_list.html', context)
