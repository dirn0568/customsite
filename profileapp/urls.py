from django.contrib import admin
from django.urls import path, include

from accountapp import views
from accountapp.views import Create_User, Detail_User, Update_User, Delete_User
from profileapp.views import Create_Profile_View

app_name = 'profileapp'

urlpatterns = [
    path('create_profile/<int:pk>/', Create_Profile_View.as_view(), name='create_profile'),
    path('detail_profile/<int:pk>/', Detail_User.as_view(), name='detail_profile'),
    path('update_profile/<int:pk>/', Update_User.as_view(), name='update_profile'),
    path('delete_profile/<int:pk>/', Delete_User.as_view(), name='delete_profile'),
]