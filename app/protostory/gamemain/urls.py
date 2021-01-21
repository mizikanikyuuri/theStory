from django.urls import include,path
from gamemain.views import standardPlay,singlePlay
app_name = 'gamemain'

urlpatterns = [
    path('',standardPlay,name='standardPlay'),
    path('singlePlay',singlePlay,name='singlePlay'),
]