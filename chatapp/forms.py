from django import forms
from django.forms import ModelForm

from chatapp.models import ChatModel


class ChatForm(forms.ModelForm):
    chat_line = forms.CharField(widget=forms.Textarea(attrs={"cols":20, "rows":5, "min_length":0}))

    class Meta:
        model = ChatModel
        fields = ['chat_line','chat_img']