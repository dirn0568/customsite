from django.forms import ModelForm

from commentapp.models import Board_Comment


class CommentForm(ModelForm):
    class Meta:
        model = Board_Comment
        fields = ['Comment_line']