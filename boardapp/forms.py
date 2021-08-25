from django.forms import ModelForm

from boardapp.models import BoardModel

class BoardForm(ModelForm):
    class Meta:
        model = BoardModel
        fields = ['Board_title','Board_img','Board_text']

