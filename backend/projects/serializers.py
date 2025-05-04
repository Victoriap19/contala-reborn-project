
from rest_framework import serializers
from .models import (
    Project, ProjectProposal, ProjectInvitation, ProjectMessage,
    Convocatoria, ConvocatoriaApplication
)
from accounts.serializers import UserSerializer

class ProjectSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    client_id = serializers.IntegerField(write_only=True, required=False)
    
    class Meta:
        model = Project
        fields = ['id', 'title', 'description', 'client', 'client_id', 'created_at',
                  'updated_at', 'status', 'budget', 'is_public', 'deadline']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        # Si no se proporciona un client_id, usar el usuario actual
        if 'client_id' not in validated_data:
            validated_data['client'] = self.context['request'].user
        else:
            client_id = validated_data.pop('client_id')
            validated_data['client_id'] = client_id
        
        return super().create(validated_data)

class ProjectProposalSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    
    class Meta:
        model = ProjectProposal
        fields = ['id', 'project', 'creator', 'message', 'price',
                  'estimated_days', 'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'creator', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)

class ProjectInvitationSerializer(serializers.ModelSerializer):
    project = ProjectSerializer(read_only=True)
    project_id = serializers.IntegerField(write_only=True)
    creator = UserSerializer(read_only=True)
    creator_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = ProjectInvitation
        fields = ['id', 'project', 'project_id', 'creator', 'creator_id',
                  'message', 'status', 'created_at']
        read_only_fields = ['id', 'created_at']
    
    def create(self, validated_data):
        project_id = validated_data.pop('project_id')
        creator_id = validated_data.pop('creator_id')
        validated_data['project_id'] = project_id
        validated_data['creator_id'] = creator_id
        
        return super().create(validated_data)

class ProjectMessageSerializer(serializers.ModelSerializer):
    sender = UserSerializer(read_only=True)
    receiver = UserSerializer(read_only=True)
    receiver_id = serializers.IntegerField(write_only=True)
    
    class Meta:
        model = ProjectMessage
        fields = ['id', 'project', 'sender', 'receiver', 'receiver_id',
                  'content', 'read', 'created_at']
        read_only_fields = ['id', 'sender', 'read', 'created_at']
    
    def create(self, validated_data):
        receiver_id = validated_data.pop('receiver_id')
        validated_data['sender'] = self.context['request'].user
        validated_data['receiver_id'] = receiver_id
        
        return super().create(validated_data)

class ConvocatoriaSerializer(serializers.ModelSerializer):
    client = UserSerializer(read_only=True)
    
    class Meta:
        model = Convocatoria
        fields = ['id', 'title', 'description', 'client', 'budget_min',
                  'budget_max', 'deadline', 'start_date', 'end_date',
                  'status', 'created_at', 'updated_at']
        read_only_fields = ['id', 'client', 'created_at', 'updated_at']
    
    def create(self, validated_data):
        validated_data['client'] = self.context['request'].user
        return super().create(validated_data)

class ConvocatoriaApplicationSerializer(serializers.ModelSerializer):
    creator = UserSerializer(read_only=True)
    
    class Meta:
        model = ConvocatoriaApplication
        fields = ['id', 'convocatoria', 'creator', 'cover_letter',
                  'price', 'estimated_days', 'status', 'created_at']
        read_only_fields = ['id', 'creator', 'created_at']
    
    def create(self, validated_data):
        validated_data['creator'] = self.context['request'].user
        return super().create(validated_data)
