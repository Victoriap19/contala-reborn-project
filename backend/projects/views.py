from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Q
from django.core.mail import send_mail
from django.conf import settings
from .models import (
    Project, ProjectProposal, ProjectInvitation, ProjectMessage,
    Convocatoria, ConvocatoriaApplication, ProjectReview
)
from .serializers import (
    ProjectSerializer, ProjectProposalSerializer, ProjectInvitationSerializer,
    ProjectMessageSerializer, ConvocatoriaSerializer, ConvocatoriaApplicationSerializer,
    ProjectReviewSerializer
)
from accounts.permissions import IsOwnerOrReadOnly

class ProjectViewSet(viewsets.ModelViewSet):
    """
    API endpoint para proyectos
    """
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        """
        Filtra los proyectos según el usuario:
        - Administradores ven todos
        - Clientes ven sus propios proyectos
        - Creadores ven proyectos públicos y aquellos donde han sido invitados
        """
        user = self.request.user
        if user.is_staff:
            return Project.objects.all()
        
        if user.is_creator:
            # Proyectos públicos + proyectos donde el creador está invitado
            return Project.objects.filter(
                Q(is_public=True) | 
                Q(invitations__creator=user)
            ).distinct()
        
        # Cliente ve sus propios proyectos
        return Project.objects.filter(client=user)
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
    
    @action(detail=True, methods=['get'])
    def proposals(self, request, pk=None):
        project = self.get_object()
        proposals = ProjectProposal.objects.filter(project=project)
        serializer = ProjectProposalSerializer(proposals, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['get'])
    def messages(self, request, pk=None):
        project = self.get_object()
        user = request.user
        messages = ProjectMessage.objects.filter(
            project=project,
            Q(sender=user) | Q(receiver=user)
        )
        serializer = ProjectMessageSerializer(messages, many=True)
        return Response(serializer.data)

class ProjectProposalViewSet(viewsets.ModelViewSet):
    """
    API endpoint para propuestas de proyectos
    """
    queryset = ProjectProposal.objects.all()
    serializer_class = ProjectProposalSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectProposal.objects.all()
        
        if user.is_creator:
            # Creadores ven sus propias propuestas
            return ProjectProposal.objects.filter(creator=user)
        
        # Clientes ven propuestas para sus proyectos
        return ProjectProposal.objects.filter(project__client=user)
    
    def perform_create(self, serializer):
        """
        Solo permitir crear propuestas a creadores y verificar que el proyecto sea público
        o que haya sido invitado
        """
        user = self.request.user
        if not user.is_creator:
            return Response(
                {"error": "Solo los creadores pueden enviar propuestas"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        project_id = self.request.data.get('project')
        project = Project.objects.get(id=project_id)
        
        if project.is_public or ProjectInvitation.objects.filter(project=project, creator=user).exists():
            proposal = serializer.save(creator=user)
            
            # Enviar notificación por email al cliente
            try:
                client = project.client
                send_mail(
                    f'Nueva propuesta para tu proyecto: {project.title}',
                    f'{user.get_full_name()} ha enviado una propuesta para tu proyecto.\n\nPrecio: {proposal.price}\nTiempo estimado: {proposal.estimated_days} días\n\n{proposal.message}',
                    settings.DEFAULT_FROM_EMAIL,
                    [client.email],
                    fail_silently=True,
                )
            except Exception as e:
                print(f"Error al enviar email: {e}")
        else:
            return Response(
                {"error": "No puedes proponer a este proyecto"},
                status=status.HTTP_403_FORBIDDEN
            )
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        proposal = self.get_object()
        project = proposal.project
        
        # Solo el cliente puede aceptar
        if request.user != project.client:
            return Response(
                {"error": "Solo el cliente puede aceptar propuestas"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        proposal.status = 'accepted'
        proposal.save()
        
        # Cambiar el estado del proyecto
        project.status = 'in_progress'
        project.save()
        
        # Enviar notificación por email al creador
        try:
            creator = proposal.creator
            send_mail(
                f'Tu propuesta ha sido aceptada: {project.title}',
                f'{request.user.get_full_name()} ha aceptado tu propuesta para el proyecto "{project.title}".\n\nPuedes comenzar a trabajar en él y mantener contacto a través del chat del proyecto.',
                settings.DEFAULT_FROM_EMAIL,
                [creator.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error al enviar email: {e}")
        
        serializer = self.get_serializer(proposal)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        proposal = self.get_object()
        project = proposal.project
        
        # Solo el cliente puede rechazar
        if request.user != project.client:
            return Response(
                {"error": "Solo el cliente puede rechazar propuestas"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        proposal.status = 'rejected'
        proposal.save()
        
        serializer = self.get_serializer(proposal)
        return Response(serializer.data)

class ProjectInvitationViewSet(viewsets.ModelViewSet):
    """
    API endpoint para invitaciones a proyectos
    """
    queryset = ProjectInvitation.objects.all()
    serializer_class = ProjectInvitationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectInvitation.objects.all()
        
        if user.is_creator:
            # Creadores ven invitaciones que les han hecho
            return ProjectInvitation.objects.filter(creator=user)
        
        # Clientes ven invitaciones que han enviado
        return ProjectInvitation.objects.filter(project__client=user)
    
    def perform_create(self, serializer):
        """
        Verificar que quien invita sea el dueño del proyecto
        """
        project_id = self.request.data.get('project_id')
        project = Project.objects.get(id=project_id)
        
        if project.client != self.request.user and not self.request.user.is_staff:
            return Response(
                {"error": "Solo el dueño del proyecto puede enviar invitaciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        serializer.save()
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        invitation = self.get_object()
        
        # Solo el creador invitado puede aceptar
        if request.user != invitation.creator:
            return Response(
                {"error": "Solo el creador invitado puede aceptar"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        invitation.status = 'accepted'
        invitation.save()
        
        # Crear automáticamente una propuesta aceptada
        ProjectProposal.objects.create(
            project=invitation.project,
            creator=invitation.creator,
            message="Propuesta automática por invitación aceptada",
            price=invitation.project.budget or 0,  # Usar el presupuesto del proyecto
            estimated_days=30,  # Valor predeterminado
            status='accepted'
        )
        
        # Actualizar el proyecto
        invitation.project.status = 'in_progress'
        invitation.project.save()
        
        serializer = self.get_serializer(invitation)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        invitation = self.get_object()
        
        # Solo el creador invitado puede rechazar
        if request.user != invitation.creator:
            return Response(
                {"error": "Solo el creador invitado puede rechazar"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        invitation.status = 'rejected'
        invitation.save()
        
        serializer = self.get_serializer(invitation)
        return Response(serializer.data)

class ProjectMessageViewSet(viewsets.ModelViewSet):
    """
    API endpoint para mensajes de proyectos
    """
    queryset = ProjectMessage.objects.all()
    serializer_class = ProjectMessageSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectMessage.objects.all()
        
        # Usuario ve mensajes donde es remitente o destinatario
        return ProjectMessage.objects.filter(
            Q(sender=user) | Q(receiver=user)
        )
    
    def perform_create(self, serializer):
        message = serializer.save(sender=self.request.user)
        
        # Enviar notificación por email al destinatario
        try:
            receiver = message.receiver
            project = message.project
            send_mail(
                f'Nuevo mensaje en proyecto: {project.title}',
                f'{message.sender.get_full_name()} te ha enviado un mensaje:\n\n{message.content[:100]}{"..." if len(message.content) > 100 else ""}',
                settings.DEFAULT_FROM_EMAIL,
                [receiver.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error al enviar email: {e}")
    
    @action(detail=True, methods=['post'])
    def mark_as_read(self, request, pk=None):
        message = self.get_object()
        
        # Solo el receptor puede marcar como leído
        if request.user != message.receiver:
            return Response(
                {"error": "Solo el receptor puede marcar como leído"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        message.read = True
        message.save()
        
        serializer = self.get_serializer(message)
        return Response(serializer.data)

class ProjectReviewViewSet(viewsets.ModelViewSet):
    """
    API endpoint para reseñas de proyectos
    """
    queryset = ProjectReview.objects.all()
    serializer_class = ProjectReviewSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ProjectReview.objects.all()
        
        if user.is_creator:
            # Creadores ven reseñas sobre ellos
            return ProjectReview.objects.filter(creator=user)
        
        # Clientes ven reseñas que han hecho
        return ProjectReview.objects.filter(client=user)
    
    def perform_create(self, serializer):
        review = serializer.save(client=self.request.user)
        
        # Enviar notificación por email al creador
        try:
            creator = review.creator
            project = review.project
            send_mail(
                f'Nueva reseña en proyecto: {project.title}',
                f'{review.client.get_full_name()} ha dejado una reseña de {review.rating} estrellas.\n\n{review.comment if review.comment else ""}',
                settings.DEFAULT_FROM_EMAIL,
                [creator.email],
                fail_silently=True,
            )
        except Exception as e:
            print(f"Error al enviar email: {e}")
            
    @action(detail=False, methods=['get'])
    def my_pending_reviews(self, request):
        """
        Devuelve proyectos completados que aún no han sido revisados por el cliente
        """
        user = request.user
        
        # Solo para clientes
        if user.is_creator:
            return Response(
                {"error": "Solo los clientes pueden ver reseñas pendientes"},
                status=status.HTTP_403_FORBIDDEN
            )
            
        # Encontrar proyectos completados sin revisión
        completed_projects = Project.objects.filter(
            client=user,
            status='completed'
        )
        
        reviewed_project_ids = ProjectReview.objects.filter(
            client=user
        ).values_list('project_id', flat=True)
        
        pending_projects = completed_projects.exclude(id__in=reviewed_project_ids)
        
        serializer = ProjectSerializer(pending_projects, many=True)
        return Response(serializer.data)

class ConvocatoriaViewSet(viewsets.ModelViewSet):
    """
    API endpoint para convocatorias
    """
    queryset = Convocatoria.objects.all()
    serializer_class = ConvocatoriaSerializer
    permission_classes = [permissions.IsAuthenticated, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return Convocatoria.objects.all()
        
        if user.is_creator:
            # Creadores ven convocatorias abiertas
            return Convocatoria.objects.filter(status='open')
        
        # Clientes ven sus propias convocatorias
        return Convocatoria.objects.filter(client=user)
    
    def perform_create(self, serializer):
        serializer.save(client=self.request.user)
    
    @action(detail=True, methods=['get'])
    def applications(self, request, pk=None):
        convocatoria = self.get_object()
        
        # Solo el cliente puede ver todas las aplicaciones
        if request.user != convocatoria.client and not request.user.is_staff:
            return Response(
                {"error": "Solo el cliente puede ver todas las aplicaciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        applications = ConvocatoriaApplication.objects.filter(convocatoria=convocatoria)
        serializer = ConvocatoriaApplicationSerializer(applications, many=True)
        return Response(serializer.data)

class ConvocatoriaApplicationViewSet(viewsets.ModelViewSet):
    """
    API endpoint para aplicaciones a convocatorias
    """
    queryset = ConvocatoriaApplication.objects.all()
    serializer_class = ConvocatoriaApplicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        if user.is_staff:
            return ConvocatoriaApplication.objects.all()
        
        if user.is_creator:
            # Creadores ven sus propias aplicaciones
            return ConvocatoriaApplication.objects.filter(creator=user)
        
        # Clientes ven aplicaciones a sus convocatorias
        return ConvocatoriaApplication.objects.filter(convocatoria__client=user)
    
    def perform_create(self, serializer):
        """
        Solo permitir crear aplicaciones a creadores y verificar que la convocatoria est�� abierta
        """
        user = self.request.user
        if not user.is_creator:
            return Response(
                {"error": "Solo los creadores pueden aplicar a convocatorias"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        convocatoria_id = self.request.data.get('convocatoria')
        convocatoria = Convocatoria.objects.get(id=convocatoria_id)
        
        if convocatoria.status != 'open':
            return Response(
                {"error": "Solo puedes aplicar a convocatorias abiertas"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        serializer.save(creator=user)
    
    @action(detail=True, methods=['post'])
    def shortlist(self, request, pk=None):
        application = self.get_object()
        
        # Solo el cliente puede preseleccionar
        if request.user != application.convocatoria.client:
            return Response(
                {"error": "Solo el cliente puede preseleccionar aplicaciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        application.status = 'shortlisted'
        application.save()
        
        serializer = self.get_serializer(application)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def accept(self, request, pk=None):
        application = self.get_object()
        
        # Solo el cliente puede aceptar
        if request.user != application.convocatoria.client:
            return Response(
                {"error": "Solo el cliente puede aceptar aplicaciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        application.status = 'accepted'
        application.save()
        
        # Crear un proyecto automáticamente a partir de la convocatoria
        project = Project.objects.create(
            title=f"Proyecto de {application.convocatoria.title}",
            description=application.convocatoria.description,
            client=application.convocatoria.client,
            status='in_progress',
            budget=application.price,
            deadline=application.convocatoria.end_date
        )
        
        # Crear propuesta aceptada automáticamente
        ProjectProposal.objects.create(
            project=project,
            creator=application.creator,
            message=application.cover_letter,
            price=application.price,
            estimated_days=application.estimated_days,
            status='accepted'
        )
        
        serializer = self.get_serializer(application)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'])
    def reject(self, request, pk=None):
        application = self.get_object()
        
        # Solo el cliente puede rechazar
        if request.user != application.convocatoria.client:
            return Response(
                {"error": "Solo el cliente puede rechazar aplicaciones"},
                status=status.HTTP_403_FORBIDDEN
            )
        
        application.status = 'rejected'
        application.save()
        
        serializer = self.get_serializer(application)
        return Response(serializer.data)
