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
    
    def is_admin(self, instance):
        return instance.role.name == 'ADMINISTRATOR'
    
    def update(self, instance, validated_data):
        client_instance = None
        print("in update")
        
        for prop, value in validated_data.items():
            print(f"{prop}:{value}")
            
            if prop == 'role':
                if value.upper() == 'CLIENT':
                    # if the new value for 'role' is "CLIENT'
                    # create a new Client instance if one doesn't already exist
                    queryset = Client.objects.filter(user=instance)
                    if not queryset.exists():
                        client_instance = Client(user=instance)
                
                if value.upper() == "ADMINISTRATOR":
                    # if the new value for 'role' is 'ADMINISTRATOR'
                    # delete any existing Client instance for this user
                    Client.objects.filter(user=instance).delete()
                
                # set the value with the model instance of the role
                value = Role.objects.get(name=value.upper())
                
            if self.is_client(instance) and prop == 'consumer_number':
                print("Aicii")
                if not client_instance:
                    client_instance = Client.objects.get(user=instance)
                setattr(client_instance, prop, value)
                                
            setattr(instance, prop, value)
        
        instance.save()
        if client_instance: client_instance.save()
        return instance
    
    def to_representation(self, instance):
        representation = super().to_representation(instance)
        
        if self.is_admin(instance):
            representation.pop('consumer_number')
            
        if self.is_client(instance):
            representation['consumer_number'] = Client.objects.get(user=instance).consumer_number
        
        return representation
       
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