from django.urls import path

from gameapp import views

app_name = 'gameapp'

urlpatterns = [
    path('escape_ball', views.game_escape_ball_view, name='escape_ball'),
]