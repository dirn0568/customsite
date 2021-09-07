from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    nickname = models.CharField(max_length=20, unique=True)

class Friend_List(models.Model):
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend')
    friend_relation = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friend_relation')

    class Meta:
        unique_together = ('friend', 'friend_relation')