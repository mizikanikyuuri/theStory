from django.db import models

class Article(models.Model):
    title = models.CharField(max_length=100, blank=True, default='')
    about = models.CharField(max_length=200)
    main_text = models.TextField()
    pub_date = models.DateTimeField(auto_now_add=True)
    owner = models.ForeignKey('auth.User', related_name='article', on_delete=models.CASCADE)

    def __str__(self):
        return self.title
    
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    class Meta:
        ordering = ['pub_date']

class GameMatch(models.Model):
    MATCH_STATUS_CHOICES = [
    ('MATCHING', 'MATCHING'),
    ('MATCHED', 'MATCHED'),
    ('IN_GAME', 'IN_GAME'),
    ('DONE', 'DONE'),
    ('ERROR', 'ERROR'),
    ]
    match_id = models.AutoField(primary_key=True)
    player_one = models.CharField(max_length=20)
    player_two = models.CharField(max_length=20,blank=True)
    match_status = models.CharField(max_length=10,choices=MATCH_STATUS_CHOICES)
    
    def __str__(self):
        return str(self.match_id)
    
    class Meta:
        ordering = ['match_id']
