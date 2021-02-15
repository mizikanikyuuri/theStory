from django.urls import include,path
from portal.views import home,userLogin,userLogout
from rest_framework import routers
from portal.api_views import ArticleViewSet


router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)

app_name = 'portal'

urlpatterns = [
    path('',home,name='index'),
    path('about',home,name='index'),
    path('article-box',home,name='index'),
    path('contact',home,name='index'),
    path('login',userLogin,name='login'),
    path('logout',userLogout,name='logout'),
    path('', include(router.urls)),

]