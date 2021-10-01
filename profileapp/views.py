import self
from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse, reverse_lazy
from django.views.generic import CreateView, UpdateView, DeleteView, DetailView

from accountapp.models import User
from profileapp.forms import ProfileForm, Update_ProfileForm
from profileapp.models import User_Profile


def create_profile(request, pk):
    if request.method == "POST":
        form = ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_instance = User.objects.filter(pk=pk)
            for temp in temp_instance:
                temp_form.profile = temp
            temp_form.save()
            return redirect('accountapp:detail_user', pk)
    context = {}
    context['profile_form'] = ProfileForm
    context['pk'] = pk
    return render(request, 'create_profile.html', context)

def update_profile(request, pk):
    if request.method == "POST":
        form = Update_ProfileForm(request.POST, request.FILES)
        if form.is_valid():
            temp_instance = User.objects.filter(pk=pk)
            for temp in temp_instance:
                temp_profile = User_Profile.objects.filter(profile=temp)
            for temp in temp_profile:
                if len(request.POST['profile_text']) != 0:
                    temp.profile_text = request.POST['profile_text']
                if request.FILES:
                    temp.profile_img = request.FILES['profile_img']
                temp.save()
            return redirect('accountapp:detail_user', pk)
    context = {}
    context['profile_form'] = Update_ProfileForm
    context['pk'] = pk
    return render(request, 'update_profile.html', context)

def delete_profile(request, pk):
    if request.method == "POST":
        temp_instance = User.objects.filter(pk=pk)
        for temp in temp_instance:
            temp_profile = User_Profile.objects.filter(profile=temp)
        for temp in temp_profile:
            temp.delete()
        return redirect('accountapp:detail_user', pk)
    context = {}
    context['pk'] = pk
    return render(request, 'delete_profile.html', context)


