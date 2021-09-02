from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView

from accountapp.models import User
from chatapp.forms import TestForm3, TestForm2, TestForm4, ChatForm
from chatapp.models import TestModel2, TestModel3, TestModel4, ChatModel


def chatview(request, pk):
    if request.method == "POST":
        form = ChatForm(request.POST, request.FILES)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_form.send_user = request.user
            receive = User.objects.filter(pk=pk)
            for list in receive:
                temp_form.receive_user = list
            temp_form.save()
    context = {}
    chat_users_list = []
    chat_users_post_list = []
    receive_user = User.objects.filter(pk=pk)
    for list in receive_user:
        chat_users = ChatModel.objects.filter(send_user=request.user, receive_user=list)
        chat_switch_users = ChatModel.objects.filter(send_user=list, receive_user=request.user)
    for i in range(len(chat_users)):
        chat_users_list.append(chat_users[i].pk)
    for j in range(len(chat_switch_users)):
        chat_users_list.append(chat_switch_users[j].pk)
    chat_users_list.sort()
    for i in range(len(chat_users_list)):
        chat_users_post_list.append(ChatModel.objects.filter(pk=chat_users_list[i]))
    # print(chat_users_post_list, '어떻게 나오냐3')
    context['chat_form'] = ChatForm
    context['chat_pk'] = pk
    context['chat_users'] = chat_users_post_list
    return render(request, 'chat.html', context)



class CreateTestView2(CreateView):
    model = TestModel2
    form_class = TestForm2
    template_name = 'test2.html'

class CreateTestView3(CreateView):
    model = TestModel3
    form_class = TestForm3
    template_name = 'test3.html'

class CreateTestView4(CreateView):
    model = TestModel4
    form_class = TestForm4
    template_name = 'test4.html'

