from django.shortcuts import render
from navigation_system import settings

def home(request):
    return render(request, 'navigation_system/home.html', {'api_key' : settings.API_KEY})