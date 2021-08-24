from django.contrib.auth.forms import UserCreationForm
from accountapp.models import User
from django.http import request
from django.shortcuts import render

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, DetailView, UpdateView, DeleteView

from accountapp.forms import Update_User_Form, Create_User_Form


class Create_User(CreateView):
    model = User
    form_class = Create_User_Form
    template_name = 'create_user.html'
    success_url = reverse_lazy('accountapp:test')

    # def form_valid(self, form):
    #     temp_test = form.save(commit=False)
    #     nickname = form.cleaned_data.get('nickname')
    #     print(form)
    #     temp_test(Nickname=nickname).save()
    #     temp_test.save()
    #     print(nickname, '#!%!#$!@$')
    #     return super().form_valid(form)

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
    success_url = reverse_lazy('accountapp:test')


def test(request):
    context = {}
    return render(request, 'test.html', context)
