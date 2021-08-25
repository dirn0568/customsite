from django.contrib import admin

# Register your models here.
from boardapp.models import BoardModel

admin.site.register(BoardModel)