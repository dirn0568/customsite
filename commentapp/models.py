from django.db import models

# Create your models here.
from accountapp.models import User
from boardapp.models import BoardModel


class Board_Comment(models.Model):
    Comment_User = models.ForeignKey(User, on_delete=models.CASCADE)
    Comment_Board = models.ForeignKey(BoardModel, on_delete=models.CASCADE)

    Comment_line = models.CharField(max_length=50)

    Comment_Time = models.DateField(auto_now_add=True)