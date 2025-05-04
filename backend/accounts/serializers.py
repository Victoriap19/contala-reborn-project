
from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import CreatorProfile, CreatorPortfolioItem, SocialNetworkLink

User = get_user_model()

class SocialNetworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = SocialNetworkLink
        fields = ['id', 'network', 'url', 'username']

class PortfolioItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = CreatorPortfolioItem
        fields = ['id', 'type', 'url', 'title', 'description', 'created_at']

class CreatorProfileSerializer(serializers.ModelSerializer):
    portfolio_items = PortfolioItemSerializer(many=True, read_only=True)
    
    class Meta:
        model = CreatorProfile
        fields = ['id', 'specialties', 'experience_years', 'location', 'average_rating', 'review_count', 'portfolio_items']
        read_only_fields = ['average_rating', 'review_count']

class UserSerializer(serializers.ModelSerializer):
    social_networks = SocialNetworkSerializer(many=True, read_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'bio', 
                  'profile_picture', 'is_creator', 'social_networks']
        read_only_fields = ['id']

class CreatorUserSerializer(UserSerializer):
    creator_profile = CreatorProfileSerializer(read_only=True)
    
    class Meta(UserSerializer.Meta):
        fields = UserSerializer.Meta.fields + ['creator_profile']

class UserCreateSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'first_name', 'last_name', 'is_creator']
        
    def create(self, validated_data):
        user = User.objects.create_user(
            username=validated_data['username'],
            email=validated_data['email'],
            password=validated_data['password'],
            first_name=validated_data.get('first_name', ''),
            last_name=validated_data.get('last_name', ''),
            is_creator=validated_data.get('is_creator', False)
        )
        
        # Si es un creador, crear perfil automáticamente
        if user.is_creator:
            CreatorProfile.objects.create(user=user)
            
        return user

class PasswordChangeSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
