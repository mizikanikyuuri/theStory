from portal.models import Article
from rest_framework import viewsets
from rest_framework import permissions
from . import serializers


class ArticleViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows article to be viewed or edited.
    """
    queryset = Article.objects.all().order_by('pub_date')
    serializer_class = serializers.ArticleSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
