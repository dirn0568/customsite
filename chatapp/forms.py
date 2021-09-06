from django.forms import ModelForm

from chatapp.models import ChatModel


class ChatForm(ModelForm):
    class Meta:
        model = ChatModel
        fields = ['chat_line','chat_img']