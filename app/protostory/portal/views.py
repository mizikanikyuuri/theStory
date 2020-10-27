from django.shortcuts import render
from django.shortcuts import get_object_or_404,render
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login ,logout
from django.http import JsonResponse, Http404
from django.views.decorators.csrf import ensure_csrf_cookie
import json

import logging

@ensure_csrf_cookie
def home (request):
    return render(request,'portal/home.html')

def userLogin(request):
    #  logger.error('request.content_type')
    if request.method != 'POST' :
        return JsonResponse({
                'login': 'fail',
                'detail': 'format invalid'
                })
    user = authenticate(username=request.POST["username"],password= request.POST["password"])
    #if user couldn't authenticated try to create user and reauthenicate it.
    if user is None:
        try:
            user = User.objects.create_user(username=request.POST["username"],password=request.POST["password"])
        except Exception as e:
            return JsonResponse({
                'login': 'fail',
                'detail':print(e)
            })
        user = authenticate(username=request.POST["username"],password= request.POST["password"])
    login(request, user)
    
    return JsonResponse({'login': 'success'})

    
def userLogout(request):
    logout(request)
    return JsonResponse({'logout': 'success'})