import self
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView

from accountapp.models import User
from profileapp.forms import ProfileForm, Update_ProfileForm
from profileapp.models import User_Profile


class Create_Profile_View(CreateView):
    model = User_Profile
    pk_url_kwarg = 'target_pk'
    context_object_name = 'target_profile'
    form_class = ProfileForm
    template_name = 'create_profile.html'

    def get_object(self, queryset=None):
        print('작동되고있긴한가1351353151513531531')
        return super().form_valid(self.pk)

    def form_valid(self, form, pk):
        print("실앻ㅇ주우우우웅")
        temp_profile = form.save(commit=False)
        temp_profile.pk = self.request.user
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

def create_profile(request, pk):
    if request.method == "POST":
        form = ProfileForm(request.POST)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_instance =  User.objects.filter(pk=pk)
            for temp in temp_instance:
                temp_form.profile = temp
            temp_form.save()
            return redirect('accountapp:detail_user', pk)
    context = {}
    context['profile_form'] = ProfileForm
    context['pk'] = pk
    return render(request, 'create_profile.html', context)

