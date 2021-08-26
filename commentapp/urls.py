from django.contrib import admin
from django.urls import path, include

from commentapp.views import CreateCommentView, ListCommentView, DetailCommentView

app_name = 'commentapp'

urlpatterns = [
    path('list_comment/', ListCommentView.as_view(), name='list_comment'),
    path('detail_comment/<int:pk>', DetailCommentView.as_view(), name='detail_comment'),
]