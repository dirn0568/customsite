from django.http import HttpResponse
from django.shortcuts import render

# Create your views here.
from django.views.generic import DetailView

from accountapp.models import User
from friendapp.models import FriendModel
from messageapp.models import MessageBoxModel


def test(request, pk):
    print(request.user, '리케케드느스유적')
    context = {}
    testing = FriendModel.objects.filter(B_User=request.user)
    context['테스팅'] = testing
    return render(request, 'message_box.html', context)