from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt

from api.models import Post, Comment
from api.serializers import PostSerializer, CommentSerializer
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework_simplejwt.authentication import JWTAuthentication



# GET /posts/ → List all posts

@api_view(['GET'])
def get_posts(request):
    posts = Post.objects.all()
    serializer = PostSerializer(posts, many=True)
    return Response({"msg":serializer.data},status=status.HTTP_200_OK)



@api_view(['POST'])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])

def create_post(request):
    serializer = PostSerializer(data=request.data)

    if serializer.is_valid():
        serializer.save(author=request.user.author)

        return Response({
            "msg": "Added Post",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
@api_view(['GET'])
def get_comments(request, id):
    try:
        comments = Comment.objects.filter(post_id=id)

        if not comments.exists():
            return Response(
                {"message": "No comments found for this post"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CommentSerializer(comments, many=True)
        return Response(serializer.data)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )



# POST /posts/<id>/comments/ → Add comment

@permission_classes([IsAuthenticated])
@api_view(['POST'])
def create_comment(request, id):
    try:
        post = Post.objects.get(id=id)
        data = request.data.copy()
        data['post'] = post.id 
        serializer = CommentSerializer(data=data)

        if serializer.is_valid():
            serializer.save(post_id=id)  
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    except Exception as e:
        return Response(
            {"error": str(e)},
            status=status.HTTP_500_INTERNAL_SERVER_ERROR
        )


@api_view(['GET'])
def health(request):
    return Response({"status": "ok"})



# GET /readiness/
@api_view(['GET'])
def readiness(request):
    return Response({"status": "ready"})