
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    ProjectViewSet, ProjectProposalViewSet, ProjectInvitationViewSet, 
    ProjectMessageViewSet, ConvocatoriaViewSet, ConvocatoriaApplicationViewSet
)

router = DefaultRouter()
router.register(r'projects', ProjectViewSet)
router.register(r'proposals', ProjectProposalViewSet)
router.register(r'invitations', ProjectInvitationViewSet)
router.register(r'messages', ProjectMessageViewSet)
router.register(r'convocatorias', ConvocatoriaViewSet)
router.register(r'applications', ConvocatoriaApplicationViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
