from django.db import models

# Create your models here.
from accountapp.models import User


class BoardModel(models.Model):
    Board_Owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='Baord_Owner')

    Board_title = models.CharField(max_length=15)
    Board_img = models.ImageField(upload_to='Board_img/', null=True, blank=True)
    Board_text = models.TextField(max_length=200)
