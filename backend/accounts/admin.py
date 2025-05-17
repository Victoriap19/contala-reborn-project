
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User, CreatorProfile, CreatorPortfolioItem, SocialNetworkLink

class CreatorProfileInline(admin.StackedInline):
    model = CreatorProfile
    can_delete = False
    verbose_name_plural = 'Perfil de Creador'

class UserAdmin(BaseUserAdmin):
    inlines = (CreatorProfileInline,)
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_creator')
    list_filter = ('is_staff', 'is_superuser', 'is_creator')
    fieldsets = BaseUserAdmin.fieldsets + (
        ('Información Adicional', {'fields': ('bio', 'profile_picture', 'is_creator')}),
    )

class PortfolioItemAdmin(admin.ModelAdmin):
    list_display = ('title', 'type', 'creator_profile', 'created_at')
    list_filter = ('type', 'created_at')
    search_fields = ('title', 'description', 'creator_profile__user__username')

class SocialNetworkAdmin(admin.ModelAdmin):
    list_display = ('network', 'user', 'username')
    list_filter = ('network',)
    search_fields = ('user__username', 'username')

admin.site.register(User, UserAdmin)
admin.site.register(CreatorPortfolioItem, PortfolioItemAdmin)
admin.site.register(SocialNetworkLink, SocialNetworkAdmin)
