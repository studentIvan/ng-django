from django.shortcuts import render
from django.http import HttpResponse


def acme(request):
    return render(request, 'index.html')
