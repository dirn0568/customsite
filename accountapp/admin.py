from django.contrib import admin

# Register your models here.
from accountapp.models import User, Friend_List

admin.site.register(User)
admin.site.register(Friend_List)
