from django.shortcuts import render

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, DetailView, ListView, DeleteView

from boardapp.models import BoardModel
from commentapp.forms import CommentForm
from commentapp.models import Board_Comment


class DeleteCommentView(DeleteView):
    model = Board_Comment
    context_object_name = 'target_comment'
    template_name = 'delete_comment.html'

    def get_success_url(self):
        return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().Comment_Board.pk})
