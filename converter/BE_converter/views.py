from django.shortcuts import render
from django.http import JsonResponse
from .convert import min_terms
from .diagram import draw
from .models import Boolean_Expression
# Create your views here.

def index(request):
    return render(request, 'BE_converter/main.html')

def convert_truth_table(request):
    if request.is_ajax():
        minterms = []
        data = request.POST
        data_ = dict(data.lists()) #convert querydictionary into ordinary dictionary
        data_.pop('csrfmiddlewaretoken')

        for name,value in data_.items():
            if value[0] == '1':
                minterms.append(int(name)) #extracting minterms
        boolean_expression = min_terms(minterms)
        result = ' + '.join(''.join(i) for i in boolean_expression)
        Boolean_Expression.objects.create(expression=result) #creating expression
        expression_pk = Boolean_Expression.objects.latest('pk') #primary key of expression just created
        circuit_image_path = draw(boolean_expression, expression_pk) #creating circuit diagram
        print(boolean_expression)
        print(circuit_image_path)
        return JsonResponse({ 'results': result,
                                'expression': boolean_expression,
                                'image': circuit_image_path})
