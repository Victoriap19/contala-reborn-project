
from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    UserViewSet, CreatorViewSet, CreatorProfileViewSet,
    PortfolioItemViewSet, SocialNetworkViewSet
)

router = DefaultRouter()
router.register(r'users', UserViewSet)
router.register(r'creators', CreatorViewSet)
router.register(r'creator-profiles', CreatorProfileViewSet)
router.register(r'portfolio', PortfolioItemViewSet)
router.register(r'social-networks', SocialNetworkViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
