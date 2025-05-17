
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from .models import CreatorProfile

User = get_user_model()

@receiver(post_save, sender=User)
def create_creator_profile(sender, instance, created, **kwargs):
    """
    Crear automáticamente un perfil de creador cuando un usuario se registra como creador
    """
    if created and instance.is_creator:
        CreatorProfile.objects.create(user=instance)
