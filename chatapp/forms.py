from django.forms import ModelForm

from chatapp.models import TestModel2, TestModel3, TestModel4, ChatModel


class ChatForm(ModelForm):
    class Meta:
        model = ChatModel
        fields = ['chat_line','chat_img']



class TestForm2(ModelForm):
    class Meta:
        model = TestModel2
        fields = ['test','test2']

class TestForm3(ModelForm):
    class Meta:
        model = TestModel3
        fields = ['test3']

class TestForm4(ModelForm):
    class Meta:
        model = TestModel4
        fields = ['test4']