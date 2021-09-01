from django.contrib import admin
from django.urls import path, include

from chatapp import views
from chatapp.views import CreateTestView2, CreateTestView3, CreateTestView4

app_name = 'chatapp'

urlpatterns = [
    path('talk/<int:pk>', views.chatview, name='chat'),

    path('test2/', CreateTestView2.as_view(), name='create_test2'),
    path('test3/', CreateTestView3.as_view(), name='create_test3'),
    path('test4/', CreateTestView4.as_view(), name='create_test4'),
]