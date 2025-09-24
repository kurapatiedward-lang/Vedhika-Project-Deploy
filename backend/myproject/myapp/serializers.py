from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email','employee_id' ,'role', 'contact_info', 'created_at'] #remove employee id from here if not needed
        read_only_fields = ['id', 'created_at']
