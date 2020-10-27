from django.urls import include,path
from gamemain.views import home
app_name = 'gamemain'

urlpatterns = [
    path('',home,name='index'),
]