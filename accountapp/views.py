from django.contrib.auth.forms import UserCreationForm
from accountapp.models import User, Friend_List
from django.http import request
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from accountapp.forms import Update_User_Form, Create_User_Form
from friendapp.models import FriendRequestModel


class Create_User(CreateView):
    model = User
    form_class = Create_User_Form
    template_name = 'create_user.html'

    def get_success_url(self):
        return reverse('accountapp:login')

class Detail_User(DetailView):
    model = User
    context_object_name = 'target_user'
    template_name = 'detail_user.html'

class Update_User(UpdateView):
    model = User
    form_class = Update_User_Form
    context_object_name = 'target_user'
    template_name = 'update_user.html'

    def get_success_url(self):
        return reverse('accountapp:detail_user', kwargs={'pk': self.object.pk})


class Delete_User(DeleteView):
    model = User
    context_object_name = 'target_user'
    template_name = 'delete_user.html'
    success_url = reverse_lazy('mainapp:main')

def createfriend(request, friend1, friend2, pk):
    friend_data1 = User.objects.filter(username=friend1)
    friend_data2 = User.objects.filter(username=friend2)
    for data1 in friend_data1:
        for data2 in friend_data2:
            Friend_List(friend=data1, friend_relation=data2).save()
            Friend_List(friend=data2, friend_relation=data1).save()
    request_friend_data = FriendRequestModel.objects.filter(pk=pk)
    for request_friend_delete in request_friend_data:
        temp_pk = request_friend_delete.B_User.pk
        request_friend_delete.delete()
    return redirect('messageapp:message_box', temp_pk)


