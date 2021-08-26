from django.shortcuts import render

# Create your views here.
from django.urls import reverse_lazy, reverse
from django.views.generic import CreateView, ListView, DetailView

from boardapp.forms import BoardForm
from boardapp.models import BoardModel
from commentapp.forms import CommentForm


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
    context_object_name = 'board_target'
    template_name = 'detail_board.html'

    def form_valid(self, form):
        temp_comment = form.save(commit=False)
        print(self.request.POST, '1111111111111111')
        temp_comment.Comment_User = self.request.user
        print(self.get_queryset(), '22222222222222222222222') # 게시판 모델들이 다나옴
        print(self.get_object(), '3333333333333333333333')
        temp_comment.Comment_Board = self.get_object()
        temp_comment.save()
        return super().form_valid(form)

    def get_success_url(self):
        # print('진행중?')
        # print(self.object)
        # print(self.get_object())
        # print(self.get_queryset())
        return reverse('boardapp:detail_board', kwargs={'pk': self.get_object().pk})


