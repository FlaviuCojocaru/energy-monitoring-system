from rest_framework import serializers
from .models import Client, Role
     
        
class UserSerializer(serializers.Serializer):   
    id = serializers.IntegerField(read_only = True)
    role = serializers.CharField(max_length=15)  
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField()
    first_name = serializers.CharField(max_length=150)
    last_name = serializers.CharField(max_length=150)
    consumer_number = serializers.CharField(max_length=10, required=False)
    
    def is_client(self, instance):
        return instance.role.name == 'CLIENT'
    
    def update(self, instance, validated_data):
        for prop, value in validated_data.items():
            _instance = instance
            
            if prop == 'role': value = Role.objects.get(name=value.upper()) 
            if self.is_client(_instance) and prop == 'consumer_number': 
                _instance = Client.objects.get(user=instance)            
            
            setattr(_instance, prop, value)
            _instance.save()
            
        return instance
    
    def to_representation(self, instance):
        ret = super().to_representation(instance)
        if self.is_client(instance):
            ret['consumer_number'] = Client.objects.get(user=instance).consumer_number
        return ret
    
    # validators
    def validate_role(self, value):
        for role in Role.ROLE_CHOICES:
            if role[0] == value.upper():
                return value
        raise serializers.ValidationError(f"{value} is not a valid role.")
    
    
class RegisterSerializer():
    pass


class LoginSerializer():
    pass