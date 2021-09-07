from django.contrib import admin
from django.urls import path, include

from commentapp import views
from commentapp.views import UpdateCommentView

app_name = 'commentapp'

urlpatterns = [
    path('update_comment/<int:pk>', UpdateCommentView.as_view(), name='update_comment'),
    path('delete_comment/<int:pk>', views.deletecommentview, name='delete_comment'),
]