from django.contrib import admin

# Register your models here.
from messageapp.models import MessageBoxModel

admin.site.register(MessageBoxModel)