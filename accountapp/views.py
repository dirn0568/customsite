from django.contrib.auth.forms import UserCreationForm
from accountapp.models import User, Friend_List
from django.http import request
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from accountapp.forms import Update_User_Form, Create_User_Form
from friendapp.models import FriendRequestModel
from profileapp.models import User_Profile


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

    def get_context_data(self, **kwargs):
        context = super(Detail_User, self).get_context_data(**kwargs)
        temp_user = User.objects.filter(pk=self.object.pk)
        for temp in temp_user:
            user = temp
        temp_profile = User_Profile.objects.filter(profile=user)
        if temp_profile.count() != 0:
            for temp in temp_profile:
                profile = temp
        else:
            profile = None
        context['profile'] = profile
        return context
        # profile_list = []
        # temp_user = User.objects.filter(pk=self.request.user.pk)
        # for temp in temp_user:
        #     temp_profile = User_Profile.objects.filter(profile=temp)
        # print(temp_profile)
        # for list in temp_profile:
        #     profile_list.append(list)
        # print(profile_list, '33333333333333333333333')
        # print(self.object, '444444444444444444444444444444')
        # return super().get_context_data(object_list=profile_list, **kwargs)


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


