from django.shortcuts import render

def standardPlay (request):
    return render(request,'gamemain/standardPlay.html')

def singlePlay (request):
    return render(request,'gamemain/singlePlay.html')