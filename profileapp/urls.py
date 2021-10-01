from django.contrib import admin
from django.urls import path, include

from accountapp.views import Create_User, Detail_User, Update_User, Delete_User
from profileapp import views

app_name = 'profileapp'

urlpatterns = [
    path('create_profile/<int:pk>/', views.create_profile, name='create_profile'),
    path('update_profile/<int:pk>/', views.update_profile, name='update_profile'),
    path('delete_profile/<int:pk>/', views.delete_profile, name='delete_profile'),
]