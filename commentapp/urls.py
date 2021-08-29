from django.contrib import admin
from django.urls import path, include

from commentapp.views import DeleteCommentView

app_name = 'commentapp'

urlpatterns = [
    path('delete_comment/<int:pk>', DeleteCommentView.as_view(), name='delete_comment'),
]