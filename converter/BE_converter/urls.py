from django.urls import path
from . import views

app_name = 'BE_converter'

urlpatterns = [
    path('', views.index, name='main-view'),
    path('convert/', views.convert_truth_table, name='convert-view'),

]
