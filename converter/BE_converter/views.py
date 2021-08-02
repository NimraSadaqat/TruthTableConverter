from django.shortcuts import render

# Create your views here.
# class TestListView(ListView):
#     model = Test
#     template_name = 'mcqs/main.html'
def index(request):
    return render(request, 'main.html')
