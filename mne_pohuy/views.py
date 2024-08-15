from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files.storage import default_storage
from profiles.models import Profile  # Импорт модели Profile из приложения users
from profiles.serializers import ProfileSerializer  # Импорт сериализатора
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import AllowAny

class RegisterView(APIView):
    permission_classes = [AllowAny]  # Разрешаем доступ всем

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        password = request.data.get('password')

        if not username or not email or not password:
            return Response({"error": "All fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already taken"}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )

        return Response({"message": "User created successfully"}, status=status.HTTP_201_CREATED)
    
class ProfileView(APIView):
    authentication_classes = [TokenAuthentication]  # Используйте подходящий класс аутентификации
    permission_classes = [IsAuthenticated]

    def put(self, request):
        user = request.user
        profile = Profile.objects.get(user=user)  # Получаем профиль пользователя

        serializer = ProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
