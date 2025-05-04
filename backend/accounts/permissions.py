
from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permiso personalizado para permitir que solo los propietarios de un objeto lo editen.
    """
    
    def has_object_permission(self, request, view, obj):
        # Leer permisos están permitidos para cualquier solicitud
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # La instancia debe tener un atributo 'user'
        if hasattr(obj, 'user'):
            return obj.user == request.user
        
        # O la instancia es el propio usuario
        return obj == request.user
