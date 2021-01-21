# portal/routing.py
from django.urls import re_path,path

from .consumer import standardPlayConsumer
from .consumer import singlePlayConsumer

websocket_urlpatterns = [
    re_path(r'ws/gameMain/standardPlayConsumer/$', standardPlayConsumer.StandardPlayConsumer),
    re_path(r'ws/gameMain/singlePlayConsumer/$', singlePlayConsumer.SinglePlayConsumer)]