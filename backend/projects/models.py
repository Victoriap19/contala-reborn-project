from django.db import models
from django.utils.translation import gettext_lazy as _
from django.conf import settings

class Project(models.Model):
    """Modelo para los proyectos"""
    
    STATUS_CHOICES = (
        ('draft', 'Borrador'),
        ('open', 'Abierto'),
        ('in_progress', 'En progreso'),
        ('completed', 'Completado'),
        ('canceled', 'Cancelado'),
    )
    
    title = models.CharField(_('título'), max_length=200)
    description = models.TextField(_('descripción'))
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                              related_name='client_projects')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='draft')
    budget = models.DecimalField(_('presupuesto'), max_digits=10, decimal_places=2, null=True, blank=True)
    is_public = models.BooleanField(_('es público'), default=False, 
                                   help_text=_('Si está marcado, será visible en la sección Generales'))
    deadline = models.DateField(_('fecha límite'), null=True, blank=True)
    reviews_left = models.PositiveSmallIntegerField(_('revisiones restantes'), default=3)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('proyecto')
        verbose_name_plural = _('proyectos')
    
    def __str__(self):
        return self.title

class ProjectProposal(models.Model):
    """Propuestas de los creadores para los proyectos"""
    
    STATUS_CHOICES = (
        ('pending', 'Pendiente'),
        ('accepted', 'Aceptada'),
        ('rejected', 'Rechazada'),
    )
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='proposals')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                               related_name='creator_proposals')
    message = models.TextField(_('mensaje'))
    price = models.DecimalField(_('precio propuesto'), max_digits=10, decimal_places=2)
    estimated_days = models.PositiveIntegerField(_('días estimados'))
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('propuesta')
        verbose_name_plural = _('propuestas')
        unique_together = [['project', 'creator']]
    
    def __str__(self):
        return f"Propuesta de {self.creator.username} para {self.project.title}"

class ProjectInvitation(models.Model):
    """Invitaciones directas de clientes a creadores específicos"""
    
    STATUS_CHOICES = (
        ('pending', 'Pendiente'),
        ('accepted', 'Aceptada'),
        ('rejected', 'Rechazada'),
    )
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='invitations')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                               related_name='invitations')
    message = models.TextField(_('mensaje'))
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('invitación')
        verbose_name_plural = _('invitaciones')
        unique_together = [['project', 'creator']]
    
    def __str__(self):
        return f"Invitación a {self.creator.username} para {self.project.title}"

class ProjectMessage(models.Model):
    """Mensajes entre cliente y creador sobre un proyecto"""
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='messages')
    sender = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                              related_name='sent_messages')
    receiver = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                                related_name='received_messages')
    content = models.TextField(_('contenido'))
    read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['created_at']
        verbose_name = _('mensaje')
        verbose_name_plural = _('mensajes')
    
    def __str__(self):
        return f"Mensaje de {self.sender.username} a {self.receiver.username}"

class Convocatoria(models.Model):
    """Convocatorias públicas para múltiples creadores"""
    
    STATUS_CHOICES = (
        ('draft', 'Borrador'),
        ('open', 'Abierta'),
        ('closed', 'Cerrada'),
    )
    
    title = models.CharField(_('título'), max_length=200)
    description = models.TextField(_('descripción'))
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                              related_name='convocatorias')
    budget_min = models.DecimalField(_('presupuesto mínimo'), max_digits=10, decimal_places=2, null=True, blank=True)
    budget_max = models.DecimalField(_('presupuesto máximo'), max_digits=10, decimal_places=2, null=True, blank=True)
    deadline = models.DateField(_('fecha límite para aplicar'))
    start_date = models.DateField(_('fecha de inicio'), null=True, blank=True)
    end_date = models.DateField(_('fecha de finalización'), null=True, blank=True)
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='draft')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('convocatoria')
        verbose_name_plural = _('convocatorias')
    
    def __str__(self):
        return self.title

class ConvocatoriaApplication(models.Model):
    """Aplicaciones de creadores a convocatorias"""
    
    STATUS_CHOICES = (
        ('pending', 'Pendiente'),
        ('shortlisted', 'Preseleccionado'),
        ('accepted', 'Aceptado'),
        ('rejected', 'Rechazado'),
    )
    
    convocatoria = models.ForeignKey(Convocatoria, on_delete=models.CASCADE, related_name='applications')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                               related_name='applications')
    cover_letter = models.TextField(_('carta de presentación'))
    price = models.DecimalField(_('precio propuesto'), max_digits=10, decimal_places=2)
    estimated_days = models.PositiveIntegerField(_('días estimados'))
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='pending')
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('aplicación')
        verbose_name_plural = _('aplicaciones')
        unique_together = [['convocatoria', 'creator']]
    
    def __str__(self):
        return f"Aplicación de {self.creator.username} para {self.convocatoria.title}"

class ProjectReview(models.Model):
    """Reseñas de los clientes sobre los creadores"""
    
    project = models.ForeignKey(Project, on_delete=models.CASCADE, related_name='reviews')
    client = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                              related_name='client_reviews')
    creator = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, 
                               related_name='creator_reviews')
    rating = models.PositiveSmallIntegerField(_('calificación'), choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(_('comentario'), blank=True, null=True)
    recommendation = models.TextField(_('recomendación'), blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['-created_at']
        verbose_name = _('reseña')
        verbose_name_plural = _('reseñas')
        unique_together = [['project', 'client', 'creator']]
    
    def __str__(self):
        return f"Reseña de {self.client.username} para {self.creator.username} en {self.project.title}"
