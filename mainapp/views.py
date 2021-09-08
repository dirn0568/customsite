import self
from django.db.models import Q
from django.shortcuts import render

# Create your views here.
from django.template.context_processors import request
from django.views.generic import ListView, RedirectView, TemplateView, FormView

from accountapp.decorators import testing1234
from accountapp.models import User
from mainapp.forms import SearchUserForm


class MainView(TemplateView):
    template_name = 'main.html'
    def get(self, request):
        print(self.request.user)
        return render(request, 'main.html')


class SearchUserView(FormView):
    form_class = SearchUserForm
    template_name = 'search_information.html'

    def form_valid(self, form):
        searchword = form.cleaned_data['search_word']
        user_list = User.objects.filter(Q(username__icontains=searchword) | Q(nickname__icontains=searchword))
        context = {}
        context['form'] = form
        context['user_list'] = user_list

        return render(self.request, self.template_name, context)



def searchfriendview(request):
    context = {}
    context['user_data'] = User.objects.all()
    print(User.objects.all(), '티키타카타타타타타타타카카카카카캌')
    return render(request, 'search_friend.html', context)



