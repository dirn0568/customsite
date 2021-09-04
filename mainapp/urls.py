from django.urls import path, include

from mainapp import views
from mainapp.views import MainView, SearchUserView

app_name = 'mainapp'

urlpatterns = [
    path('', MainView.as_view(), name='main'),

    path('search_information', SearchUserView.as_view(), name='search_information'),
    path('search_friend', views.searchfriendview, name='search_friend'),
]