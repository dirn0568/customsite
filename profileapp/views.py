from django.shortcuts import render

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView

from profileapp.forms import ProfileForm, Update_ProfileForm
from profileapp.models import User_Profile


class Create_Profile_View(CreateView):
    model = User_Profile
    form_class = ProfileForm
    template_name = 'create_profile.html'

    def form_valid(self, form):
        temp_profile = form.save(commit=False)
        temp_profile.profile = self.request.user
        temp_profile.save()
        return super().form_valid(form)

    def get_success_url(self):
        return reverse('mainapp:main')

class Update_Profile_View(UpdateView):
    model = User_Profile
    form_class = Update_ProfileForm
    context_object_name = 'target_profile'
    template_name = ''

    def get_success_url(self):
        return reverse('', kwargs={'pk': self.object.pk})

class Delete_Profile_View(DeleteView):
    model = User_Profile
    context_object_name = 'target_profile'
    template_name = ''
    success_url = reverse_lazy('mainapp:main')