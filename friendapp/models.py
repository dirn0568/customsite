from django.db import models

# Create your models here.
from accountapp.models import User

class FriendModel(models.Model):
    A_User = models.ForeignKey(User, on_delete=models.CASCADE, related_name='A_User')
    B_User = models.ForeignKey(User, on_delete=models.CASCADE, related_name='B_User')