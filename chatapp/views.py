from django.shortcuts import render

# Create your views here.
from django.views.generic import CreateView

from accountapp.models import User
from chatapp.forms import TestForm3, TestForm2, TestForm4, ChatForm
from chatapp.models import TestModel2, TestModel3, TestModel4, ChatModel


def chatview(request, pk):
    if request.method == "POST":
        print(request.POST, '가나다라마바사')
        print(request.FILES, '가나다라마바사')
        form = ChatForm(request.POST, request.FILES)
        if form.is_valid():
            temp_form = form.save(commit=False)
            temp_form.send_user = request.user
            receive = User.objects.filter(pk=pk)
            print(receive, '리시브중')
            for list in receive:
                temp_form.receive_user = list
            temp_form.save()
    print(request.user, '1351ㅁㄶㄻㄴㅇㅎㄻㄶㅁㄴㅇㅎㅁㅎ513512351351235')
    context = {}
    receive_user = User.objects.filter(pk=pk)
    for list in receive_user:
        chat_users = ChatModel.objects.filter(send_user=request.user, receive_user=list)
    context['chat_form'] = ChatForm
    context['chat_pk'] = pk
    context['chat_data'] = chat_users
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

