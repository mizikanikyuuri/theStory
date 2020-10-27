from django.urls import include,path
from rest_framework import routers
from portal.views import home,userLogin,userLogout
from portal.api_views import ArticleViewSet

app_name = 'portal'
router = routers.DefaultRouter()
router.register(r'article', ArticleViewSet)

urlpatterns = [
    path('',home,name='index'),
    path('login',userLogin,name='login'),
    path('logout',userLogout,name='logout'),
    path('', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),

]