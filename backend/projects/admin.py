
from django.contrib import admin
from .models import (
    Project, ProjectProposal, ProjectInvitation, ProjectMessage,
    Convocatoria, ConvocatoriaApplication
)

class ProjectAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'status', 'created_at')
    list_filter = ('status', 'is_public')
    search_fields = ('title', 'description', 'client__username')

class ProjectProposalAdmin(admin.ModelAdmin):
    list_display = ('project', 'creator', 'price', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('project__title', 'creator__username')

class ProjectInvitationAdmin(admin.ModelAdmin):
    list_display = ('project', 'creator', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('project__title', 'creator__username')

class ProjectMessageAdmin(admin.ModelAdmin):
    list_display = ('sender', 'receiver', 'read', 'created_at')
    list_filter = ('read',)
    search_fields = ('content', 'sender__username', 'receiver__username')

class ConvocatoriaAdmin(admin.ModelAdmin):
    list_display = ('title', 'client', 'status', 'deadline')
    list_filter = ('status',)
    search_fields = ('title', 'description', 'client__username')

class ConvocatoriaApplicationAdmin(admin.ModelAdmin):
    list_display = ('convocatoria', 'creator', 'price', 'status', 'created_at')
    list_filter = ('status',)
    search_fields = ('convocatoria__title', 'creator__username')

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectProposal, ProjectProposalAdmin)
admin.site.register(ProjectInvitation, ProjectInvitationAdmin)
admin.site.register(ProjectMessage, ProjectMessageAdmin)
admin.site.register(Convocatoria, ConvocatoriaAdmin)
admin.site.register(ConvocatoriaApplication, ConvocatoriaApplicationAdmin)
