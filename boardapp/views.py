from django.shortcuts import render, redirect

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, ListView, DetailView, DeleteView, UpdateView

from boardapp.forms import BoardForm, Update_BoardForm
from boardapp.models import BoardModel
from commentapp.forms import CommentForm
from commentapp.models import Board_Comment


class CreateBoardView(CreateView):
    model = BoardModel
    form_class = BoardForm
    template_name = 'create_board.html'
    success_url = reverse_lazy('mainapp:main')

    def form_valid(self, form):
        temp_board = form.save(commit=False)
        temp_board.Board_Owner = self.request.user
        temp_board.save()
        return super().form_valid(form)

class ListBoardView(ListView):
    model = BoardModel
    context_object_name = 'list_board'
    template_name = 'list_board.html'

class DetailBoardView(DetailView, CreateView):
    model = BoardModel
    form_class = CommentForm
    template_name = 'detail_board.html'

    def form_valid(self, form):
        temp_comment = form.save(commit=False)
        temp_comment.Comment_User = self.request.user
        temp_comment.Comment_Board = self.get_object()
        temp_comment.save()
        return super().form_valid(form)

    def get_context_data(self, **kwargs):
        context = super(DetailBoardView, self).get_context_data(**kwargs)
        context['board_comment_target'] = Board_Comment.objects.filter(Comment_Board=self.object)
        context['board_target'] = BoardModel.objects.filter(pk=self.object.pk)
        return context

    def get_success_url(self):
        return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().pk})

def deleteboardview(request, pk):
    board_list = BoardModel.objects.filter(pk=pk)
    for list in board_list:
        board_pk = list.pk
        list.delete()
    return redirect('boardapp:detail_board', board_pk)

class UpdateBoardView(UpdateView):
    model = BoardModel
    form_class = Update_BoardForm
    context_object_name = 'target_board'
    template_name = 'update_board.html'

    def get_success_url(self):
        return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().pk})


