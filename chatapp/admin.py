from django.contrib import admin

# Register your models here.
from chatapp.models import TestModel2, TestModel3, TestModel4, ChatModel

admin.site.register(ChatModel)

admin.site.register(TestModel2)
admin.site.register(TestModel3)
admin.site.register(TestModel4)