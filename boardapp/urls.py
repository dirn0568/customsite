
from django.contrib import admin
from django.urls import path, include

from boardapp.views import CreateBoardView, ListBoardView, DetailBoardView

app_name = 'boardapp'

urlpatterns = [
    path('create_board/', CreateBoardView.as_view(), name='create_board'),
    path('list_board/', ListBoardView.as_view(), name='list_board'),
    path('detail_board/<int:pk>', DetailBoardView.as_view(), name='detail_board'),
]
