from rest_framework import serializers
from .models import User,Department,Designation,BranchState,BranchLocation,SubLocation, Pincode,BranchInnerState, BranchInnerLocation , Bank ,TypeOfAccount

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'full_name', 'email','employee_id' ,'role', 'contact_info', 'created_at'] #remove employee id from here if not needed
        read_only_fields = ['id', 'created_at']






class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class DesignationSerializer(serializers.ModelSerializer):
    department_name = serializers.CharField(source='department.name', read_only=True)
    department = serializers.PrimaryKeyRelatedField(queryset=Department.objects.all())
    
    class Meta:
        model = Designation
        fields = ['id', 'name', 'department', 'department_name', 'status']
    
    def validate_department(self, value):
        """Validate that department exists"""
        if not value:
            raise serializers.ValidationError("Department is required")
        return value
    
    def validate_name(self, value):
        """Validate that designation name is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Designation name is required")
        return value.strip()




class BranchStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchState
        fields = '__all__'


class BranchLocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchLocation
        fields = '__all__'





#-------------------------------------------------------------------------------#

# SubLocation serializer

class SubLocationSerializer(serializers.ModelSerializer):
    branch_state_name = serializers.CharField(source='branch_state.name', read_only=True)
    branch_location_name = serializers.CharField(source='branch_location.name', read_only=True)
    
    class Meta:
        model = SubLocation
        fields = ['id', 'name', 'branch_state', 'branch_state_name', 'branch_location', 'branch_location_name', 'status']
    
    def validate_name(self, value):
        """Validate that sublocation name is not empty"""
        if not value or not value.strip():
            raise serializers.ValidationError("Sub Location name is required")
        return value.strip()
    
    def validate_branch_state(self, value):
        """Validate that branch state exists"""
        if not value:
            raise serializers.ValidationError("Branch State is required")
        return value
    
    def validate_branch_location(self, value):
        """Validate that branch location exists"""
        if not value:
            raise serializers.ValidationError("Branch Location is required")
        return value
    
    def validate(self, data):
        """Custom validation to ensure branch_location belongs to branch_state"""
        branch_state = data.get('branch_state')
        branch_location = data.get('branch_location')
        
        if branch_state and branch_location:
            if branch_location.branch_state != branch_state:
                raise serializers.ValidationError(
                    {"branch_location": "Selected location does not belong to the selected state"}
                )
        return data


# Pincode serializer
class PincodeSerializer(serializers.ModelSerializer):
    branch_state_name = serializers.CharField(source='branch_state.name', read_only=True)
    location_name = serializers.CharField(source='branch_location.name', read_only=True)
    sub_location_name = serializers.CharField(source='sub_location.name', read_only=True)

    class Meta:
        model = Pincode
        fields = ['id', 'pincode', 'branch_state', 'branch_state_name', 'branch_location', 'location_name', 'sub_location', 'sub_location_name', 'status', 'created_at']
        read_only_fields = ['id', 'created_at', 'branch_state_name', 'location_name', 'sub_location_name']

    def validate_pincode(self, value):
        # Ensure 6 digit numeric string
        if not value.isdigit() or len(value) != 6:
            raise serializers.ValidationError('Pincode must be a 6-digit numeric string')
        return value

    def validate(self, data):
        # Ensure location belongs to state and sublocation belongs to location
        branch_state = data.get('branch_state')
        branch_location = data.get('branch_location')
        sub_location = data.get('sub_location')

        if branch_state and branch_location:
            if branch_location.branch_state != branch_state:
                raise serializers.ValidationError({'branch_location': 'Selected location does not belong to the selected state'})

        if branch_location and sub_location:
            if sub_location.branch_location != branch_location:
                raise serializers.ValidationError({'sub_location': 'Selected sub-location does not belong to the selected location'})

        return data





class BranchInnerStateSerializer(serializers.ModelSerializer):
    class Meta:
        model = BranchInnerState
        fields = '__all__'


class BranchInnerLocationSerializer(serializers.ModelSerializer):
    branch_inner_state_name = serializers.CharField(source='branch_inner_state.name', read_only=True)
    branch_location_name = serializers.CharField(source='branch_location.name', read_only=True)

    class Meta:
        model = BranchInnerLocation
        fields = ['id', 'name', 'branch_inner_state', 'branch_inner_state_name', 'branch_location', 'branch_location_name', 'status']
        read_only_fields = ['id', 'branch_inner_state_name', 'branch_location_name']

    def validate(self, data):
        # ensure branch_location belongs to the correct state if both provided
        branch_location = data.get('branch_location')
        branch_inner_state = data.get('branch_inner_state')
        # no strict cross-check here because branch_inner_state is separate entity
        return data






class BankSerializer(serializers.ModelSerializer):
    class Meta:
        model = Bank
        fields = '__all__'


class TypeOfAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = TypeOfAccount
        fields = '__all__'
