from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, DetailView, ListView, DeleteView, UpdateView

from boardapp.models import BoardModel
from commentapp.forms import CommentForm, UpdateCommentForm
from commentapp.models import Board_Comment


# class DeleteCommentView(DeleteView):
#     model = Board_Comment
#     context_object_name = 'target_comment'
#     template_name = None
#     print('playing????????????????????????????????????????')
#
#
#     def delete(self, request, *args, **kwargs):
#         print(self.get_object(), '실험중13512351235135135')
#         pk1 = self.get_object().Comment_Board.pk
#         print(pk1)
#         self.get_object().delete()
#         print(pk1)
#         return redirect('boardapp:detail_board', pk1)
#         #return reverse('boardapp:detail_board', kwargs={'pk': pk1})
#
#     # def get_success_url(self):
#     #     print(self.get_object().Comment_Board.pk)
#     #     return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().Comment_Board.pk})

def deletecommentview(request, pk):
    comment_list = Board_Comment.objects.filter(pk=pk)
    for list in comment_list:
        comment_board_pk = list.Comment_Board.pk
        list.delete()
    return redirect('boardapp:detail_board', comment_board_pk)

class UpdateCommentView(UpdateView):
    model = Board_Comment
    form_class = UpdateCommentForm
    context_object_name = 'target_comment'
    template_name = 'update_comment.html'

    def get_success_url(self):
        return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().Comment_Board.pk})
