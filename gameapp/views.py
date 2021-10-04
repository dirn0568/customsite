from django.shortcuts import render

# Create your views here.

def game_escape_ball_view(request):

    return render(request, 'escape_ball.html')