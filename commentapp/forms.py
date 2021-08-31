from django.forms import ModelForm

from commentapp.models import Board_Comment


class CommentForm(ModelForm):
    class Meta:
        model = Board_Comment
        fields = ['Comment_line']

class UpdateCommentForm(CommentForm):
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)