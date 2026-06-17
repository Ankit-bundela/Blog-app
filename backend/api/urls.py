from django.urls import path
from api.views import *

urlpatterns = [
    # Posts
    path('posts/', get_posts, name='get_posts'),
    path('posts/create/', create_post, name='create_post'),

    # Comments
    path('posts/<int:id>/comments/', get_comments, name='get_comments'),
    path('posts/<int:id>/comments/create/', create_comment, name='create_comment'),

    # Health Check
    path('health/', health, name='health'),
    path('readiness/', readiness, name='readiness'),
]