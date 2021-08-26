from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView, DetailView, ListView

from boardapp.models import BoardModel
from commentapp.forms import CommentForm
from commentapp.models import Board_Comment


class CreateCommentView(CreateView):
    model = Board_Comment
    form_class = CommentForm

    # def form_valid(self, form):
    #     temp_comment = form.save(commit=False)
    #     print(self.request.POST, '23732823678236842')
    #     temp_comment.Comment_User = self.request.user
    #     temp_comment.Comment_Board = self.request
    #     temp_comment.save()

class ListCommentView(ListView):
    model = Board_Comment
    context_object_name = 'target_comment'
    template_name = 'list_comment.html'

    # if reqeust.GET:
    #
    # BoardModel.objects.filter()

class DetailCommentView(DetailView):
    print('실행중?1241`245`1252`1')
    model = Board_Comment
    context_object_name = 'target_comment'
    template_name = 'detail_comment.html'
    # BoardModel.objects.filter()

