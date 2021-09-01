import self
from django.shortcuts import render

# Create your views here.
from django.template.context_processors import request
from django.views.generic import ListView, RedirectView, TemplateView

from accountapp.models import User


class MainView(TemplateView):
    template_name = 'main.html'
    def get(self, request):
        print(self.request.user)
        return render(request, 'main.html')

def searchfriendview(request):
    context = {}
    context['user_data'] = User.objects.all()
    print(User.objects.all(), '티키타카타타타타타타타카카카카카캌')
    return render(request, 'search_friend.html', context)



