from django.db import models

# Create your models here.
from accountapp.models import User


class BoardModel(models.Model):
    Board_Owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Baord_Owner')

    Board_title = models.CharField(max_length=150)
    Board_img = models.FileField(upload_to='Board_img/', null=True, blank=True)
    Board_text = models.TextField(max_length=500000)

    Board_Time = models.TimeField(auto_now=True)
