from django.contrib import admin
from django.urls import path, include

from accountapp.views import Create_User, Detail_User, Update_User, Delete_User
from profileapp import views
from profileapp.views import Create_Profile_View

app_name = 'profileapp'

urlpatterns = [
    path('create_profile/<int:pk>/', views.create_profile, name='create_profile'),
    path('detail_profile/<int:pk>/', Detail_User.as_view(), name='detail_profile'),
    path('update_profile/<int:pk>/', Update_User.as_view(), name='update_profile'),
    path('delete_profile/<int:pk>/', Delete_User.as_view(), name='delete_profile'),
]