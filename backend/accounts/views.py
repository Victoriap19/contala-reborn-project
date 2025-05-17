
from rest_framework import viewsets, permissions, generics, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from .models import CreatorProfile, CreatorPortfolioItem, SocialNetworkLink
from .serializers import (
    UserSerializer, CreatorUserSerializer, UserCreateSerializer,
    CreatorProfileSerializer, PortfolioItemSerializer,
    SocialNetworkSerializer, PasswordChangeSerializer
)
from .permissions import IsOwnerOrReadOnly

User = get_user_model()

class UserViewSet(viewsets.ModelViewSet):
    """
    API endpoint para usuarios
    """
    queryset = User.objects.all()
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_serializer_class(self):
        if self.action == 'create':
            return UserCreateSerializer
        elif self.request and self.get_object().is_creator:
            return CreatorUserSerializer
        return UserSerializer
    
    def get_permissions(self):
        if self.action == 'create':
            return [permissions.AllowAny()]
        return super().get_permissions()
    
    @action(detail=True, methods=['post'], serializer_class=PasswordChangeSerializer)
    def change_password(self, request, pk=None):
        user = self.get_object()
        serializer = self.get_serializer(data=request.data)
        
        if serializer.is_valid():
            if not user.check_password(serializer.data.get('old_password')):
                return Response({'old_password': ['Contraseña incorrecta']}, 
                                status=status.HTTP_400_BAD_REQUEST)
            
            user.set_password(serializer.data.get('new_password'))
            user.save()
            return Response({'status': 'Contraseña actualizada'})
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    @action(detail=False, methods=['get'])
    def me(self, request):
        user = request.user
        if user.is_creator:
            serializer = CreatorUserSerializer(user)
        else:
            serializer = UserSerializer(user)
        return Response(serializer.data)

class CreatorViewSet(viewsets.ReadOnlyModelViewSet):
    """
    API endpoint para listar y ver creadores
    """
    queryset = User.objects.filter(is_creator=True)
    serializer_class = CreatorUserSerializer
    permission_classes = [permissions.IsAuthenticated]

class CreatorProfileViewSet(viewsets.ModelViewSet):
    """
    API endpoint para perfiles de creadores
    """
    queryset = CreatorProfile.objects.all()
    serializer_class = CreatorProfileSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        """
        Si no es staff, solo puede ver el propio perfil si es creador
        """
        user = self.request.user
        if user.is_staff:
            return CreatorProfile.objects.all()
        if user.is_creator:
            return CreatorProfile.objects.filter(user=user)
        return CreatorProfile.objects.none()

class PortfolioItemViewSet(viewsets.ModelViewSet):
    """
    API endpoint para items del portafolio de un creador
    """
    queryset = CreatorPortfolioItem.objects.all()
    serializer_class = PortfolioItemSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        """
        Filtra los ítems del portafolio según el usuario
        """
        user = self.request.user
        if user.is_staff:
            return CreatorPortfolioItem.objects.all()
        
        if user.is_creator:
            try:
                profile = user.creator_profile
                return CreatorPortfolioItem.objects.filter(creator_profile=profile)
            except CreatorProfile.DoesNotExist:
                return CreatorPortfolioItem.objects.none()
        
        return CreatorPortfolioItem.objects.none()
    
    def perform_create(self, serializer):
        """
        Asigna automáticamente el ítem al perfil del creador
        """
        try:
            profile = self.request.user.creator_profile
            serializer.save(creator_profile=profile)
        except CreatorProfile.DoesNotExist:
            return Response(
                {'error': 'No tienes un perfil de creador'},
                status=status.HTTP_400_BAD_REQUEST
            )

class SocialNetworkViewSet(viewsets.ModelViewSet):
    """
    API endpoint para redes sociales de un usuario
    """
    queryset = SocialNetworkLink.objects.all()
    serializer_class = SocialNetworkSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        """
        Filtra las redes sociales según el usuario
        """
        user = self.request.user
        if user.is_staff:
            return SocialNetworkLink.objects.all()
        return SocialNetworkLink.objects.filter(user=user)
    
    def perform_create(self, serializer):
        """
        Asigna automáticamente la red social al usuario
        """
        serializer.save(user=self.request.user)
