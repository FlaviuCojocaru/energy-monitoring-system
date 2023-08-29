from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers
from .models import Client, Role, User


class BaseUserSerializer(serializers.Serializer):

    id = serializers.IntegerField(read_only=True)
    role = serializers.CharField(max_length=15)
    username = serializers.CharField(max_length=150)
    email = serializers.EmailField(required=False)
    first_name = serializers.CharField(max_length=150, required=False)
    last_name = serializers.CharField(max_length=150, required=False)
    consumer_number = serializers.CharField(max_length=10, required=False)
    created_date = serializers.DateTimeField(read_only=True, source="date_joined", format="%Y-%m-%d")

    # validators
    def validate_role(self, value):
        """
        Check if the role has a valid value
        """
        for role in Role.ROLE_CHOICES:
            if role[0] == value.upper():
                return value
        raise serializers.ValidationError(f"{value} is not a valid role.")

    def validate_username(self, value):
        """
        Check if the username is unique in the database
        """
        qs = User.objects.filter(username__exact=value)
        if qs.exists():
            raise serializers.ValidationError(f"{value} username already exists.")
        return value

    def validate_consumer_number(self, value):
        """
        Check if the consumer_number is unique in the database
        """
        qs = Client.objects.filter(consumer_number__exact=value)
        if qs.exists():
            raise serializers.ValidationError(f'{value} consumer number already exists.')
        return value

    def validate(self, data):
        """
        Check if the role is set to Client.
        """
        if data.get('role', '').upper() == Role.CLIENT:
            consumer_number = data.get("consumer_number", None)
            if not consumer_number:
                raise serializers.ValidationError(f'client must have a consumer number.')
        return data

    # customize user representation
    def to_representation(self, instance):
        representation = super().to_representation(instance)

        if instance.is_admin():
            representation.pop('consumer_number', None)

        if instance.is_client():
            representation['consumer_number'] = Client.objects.get(
                user=instance).consumer_number

        return representation


class UserSerializer(BaseUserSerializer):

    def update(self, instance, validated_data):
        client_instance = None

        for prop, value in validated_data.items():
            if prop == 'role':
                if value.upper() == Role.CLIENT:
                    # if the new value for 'role' is "CLIENT"
                    # create a new Client instance if one doesn't already exist
                    queryset = Client.objects.filter(user=instance)
                    if not queryset.exists():
                        client_instance = Client(user=instance)

                if value.upper() == Role.ADMINISTRATOR:
                    # if the new value for 'role' is 'ADMINISTRATOR'
                    # delete any existing Client instance for this user
                    Client.objects.filter(user=instance).delete()

                # set the value with the model instance of the role
                value = Role.objects.get(name=value.upper())

            if instance.is_client() and prop == 'consumer_number':
                if not client_instance:
                    client_instance = Client.objects.get(user=instance)
                setattr(client_instance, prop, value)

            setattr(instance, prop, value)

        instance.save()
        if client_instance:
            client_instance.save()
        return instance


class CreateUserSerializer(BaseUserSerializer):

    password = serializers.CharField(write_only=True)

    def create(self, validated_data):
        password = validated_data.pop("password", None)
        role_name = validated_data.pop("role", None)
        consumer_number = validated_data.pop('consumer_number', None)

        # get the role instance from the db
        role = Role.objects.get(name=role_name.upper())
        instance = User(**validated_data)  # create the user instance
        instance.role = role  # assign the role to the user

        if password:
            instance.set_password(password)  # hash the password

        instance.save()  # save the user in the database

        if role_name.upper() == Role.CLIENT:
            # if the value for 'role' is "CLIENT"
            # create also a client instance for the user
            client_instance = Client(
                user=instance, consumer_number=consumer_number)
            client_instance.save()  # save the client instance in the db

        return instance


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['role'] = user.role.name

        return token
