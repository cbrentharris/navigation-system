from django.shortcuts import render

def home(request):
    return render(request, 'navigation_system/home.html')