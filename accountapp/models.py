from django.contrib.auth.models import User, AbstractUser
from django.db import models

# Create your models here.

class User(AbstractUser):
    nickname = models.CharField(max_length=20, unique=True)


