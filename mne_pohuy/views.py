from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password
from django.core.files.storage import default_storage


class RegisterView(APIView):
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
    def post(self, request):
        user = request.user
        name = request.data.get('name')
        profile_image = request.FILES.get('profile_image')

        if not name or not profile_image:
            return Response({"error": "Name and profile image are required."}, status=status.HTTP_400_BAD_REQUEST)

        # Сохранение изображения
        image_path = default_storage.save(f'profiles/{user.username}/profile_image.jpg', profile_image)

        # Обновление данных пользователя
        user.first_name = name
        user.profile.profile_image = image_path
        user.save()

        return Response({"message": "Profile updated successfully"}, status=status.HTTP_200_OK)