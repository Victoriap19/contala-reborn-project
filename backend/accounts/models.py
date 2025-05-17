
from django.db import models
from django.contrib.auth.models import AbstractUser
from django.utils.translation import gettext_lazy as _

class User(AbstractUser):
    """Modelo personalizado para usuarios que extiende el modelo base de Django"""
    
    is_creator = models.BooleanField(default=False, help_text=_("Indica si el usuario es un creador"))
    bio = models.TextField(blank=True, help_text=_("Biografía del usuario"))
    profile_picture = models.ImageField(upload_to='profile_pictures/', blank=True, null=True)
    
    def __str__(self):
        return self.username

class CreatorProfile(models.Model):
    """Perfil extendido para creadores con información específica"""
    
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='creator_profile')
    specialties = models.CharField(max_length=255, blank=True, help_text=_("Especialidades separadas por comas"))
    experience_years = models.PositiveIntegerField(default=0)
    location = models.CharField(max_length=100, blank=True)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    review_count = models.PositiveIntegerField(default=0)
    
    def __str__(self):
        return f"Perfil de {self.user.username}"

class CreatorPortfolioItem(models.Model):
    """Elementos del portafolio de un creador (imágenes o videos)"""
    
    ITEM_TYPES = (
        ('image', 'Imagen'),
        ('video', 'Video'),
    )
    
    creator_profile = models.ForeignKey(CreatorProfile, on_delete=models.CASCADE, related_name='portfolio_items')
    type = models.CharField(max_length=5, choices=ITEM_TYPES)
    url = models.URLField(help_text=_("URL del recurso"))
    title = models.CharField(max_length=100, blank=True)
    description = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.get_type_display()} - {self.title}"

class SocialNetworkLink(models.Model):
    """Enlaces a redes sociales del usuario"""
    
    NETWORK_TYPES = (
        ('instagram', 'Instagram'),
        ('twitter', 'Twitter'),
        ('facebook', 'Facebook'),
        ('linkedin', 'LinkedIn'),
        ('tiktok', 'TikTok'),
        ('youtube', 'YouTube'),
        ('other', 'Otra'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='social_networks')
    network = models.CharField(max_length=20, choices=NETWORK_TYPES)
    url = models.URLField()
    username = models.CharField(max_length=100, blank=True)
    
    def __str__(self):
        return f"{self.get_network_display()} de {self.user.username}"
