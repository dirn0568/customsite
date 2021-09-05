from django.db import models

# Create your models here.
from accountapp.models import User

class MessageBoxModel(models.Model):
    A_User_MessageBox = models.ForeignKey(User, on_delete=models.CASCADE, related_name='A_User_MessageBox')
    B_User_MessageBox = models.ForeignKey(User, on_delete=models.CASCADE, related_name='B_User_MessageBox')