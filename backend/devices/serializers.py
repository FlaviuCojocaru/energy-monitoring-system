from rest_framework import serializers
from .models import Address, Device
from users.models import User, Client


class AddressSerializer(serializers.ModelSerializer):
    class Meta:
        model = Address
        fields = ['country', 'city', 'county',
                  'street', 'street_number', 'apartment']


class DeviceSerializer(serializers.Serializer):
    client = serializers.CharField(max_length=150)
    address = AddressSerializer()
    description = serializers.CharField(max_length=500, required=False)
    max_energy_consumption = serializers.FloatField()

    def get_address(self, validated_data):
        """
        Retrieve an existing address from the database that matches the given address data or creates a new address. 
        """
        address_data = validated_data['address']
        address_qs = Address.objects.filter(**address_data)
        if not address_qs.exists():
            # if address doesn't exist
            # create a new instance and save it to the database
            address = Address(**address_data)
            address.save()
            return address

        # if address already exists in the database
        # retrieve that address
        return address_qs.first()

    def get_client(self, validated_data):
        """
        Retrieve a client instance with the given username from the database.
        """
        client_username = validated_data["client"]
        # retrieve the client with the given username
        client = Client.objects.get(user__username=client_username)
        return client

    def create(self, validated_data):
        """
        Create a device and an address (if doesn't exist) instance and save it to the database 
        """
        validated_data['address'] = self.get_address(validated_data)
        validated_data["client"] = self.get_client(validated_data)

        instance = Device(**validated_data)
        instance.save()
        return Device()

    def update(self, instance, validated_data):
        """
        Update a device instance.
        """
        validated_data['address'] = self.get_address(validated_data)
        validated_data["client"] = self.get_client(validated_data)

        for prop, value in validated_data.items():
            setattr(instance, prop, value)

        instance.save()
        return instance

    # validators
    def validate_client(self, value):
        """
        Check if the client exists in the db and whether they has a client role
        """
        qs = User.objects.filter(username__exact=value)
        if not qs.exists():
            raise serializers.ValidationError(f"The client doesn't exist.")

        user = qs.first()
        if not user.is_client():
            raise serializers.ValidationError(f"{value} is not a client.")

        return value
