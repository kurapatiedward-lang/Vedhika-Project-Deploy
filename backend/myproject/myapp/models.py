from django.db import models
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Custom User Manager
class CustomUserManager(BaseUserManager):
    def create_user(self, email, password=None, **extra_fields):
        if not email:
            raise ValueError("The Email field must be set")
        email = self.normalize_email(email)
        user = self.model(email=email, **extra_fields)
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, password=None, **extra_fields):
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("role", "admin")

        if extra_fields.get("is_staff") is not True:
            raise ValueError("Superuser must have is_staff=True.")
        if extra_fields.get("is_superuser") is not True:
            raise ValueError("Superuser must have is_superuser=True.")

        return self.create_user(email, password, **extra_fields)


# Custom User Model
class User(AbstractUser):
    ROLE_CHOICES = [
        ('trainer', 'Trainer'),
        ('trainee', 'Trainee'),
        ('admin', 'Admin'),
    ]

    username = None  # remove username field
    employee_id = models.CharField(max_length=20, unique=True, blank=True, null=True)
    full_name = models.CharField(max_length=255, blank=True, null=True)
    email = models.EmailField(unique=True, max_length=254)  # override AbstractUser's email
    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='trainee')
    contact_info = models.BigIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []  # no extra required fields

    objects = CustomUserManager()  # attach custom manager

    def __str__(self):
        return self.email




#----------------# Other models can be defined here as needed----------------------#

# Department table

class Department(models.Model):
    name = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name
    

#-------------------------------------------------------------------------------#

# Designation table


class Designation(models.Model):
    name = models.CharField(max_length=100, unique=True)
    department = models.ForeignKey(Department, on_delete=models.CASCADE, related_name='designations')
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name


#-------------------------------------------------------------------------------#


# Update BranchState model in models.py
class BranchState(models.Model):
    name = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=True)  # Add this field
    
    def __str__(self):
        return self.name


class BranchLocation(models.Model):
    branch_state = models.ForeignKey(BranchState, on_delete=models.CASCADE, related_name='branch_locations')
    name = models.CharField(max_length=100)
    status = models.BooleanField(default=True)  # Add this field
    
    def __str__(self):
        return f"{self.name} ({self.branch_state.name})"





#-------------------------------------------------------------------------------#
#-------------------------------------------------------------------------------#

# SubLocation table

class SubLocation(models.Model):
    name = models.CharField(max_length=100)
    branch_state = models.ForeignKey(BranchState, on_delete=models.CASCADE, related_name='sublocations')
    branch_location = models.ForeignKey(BranchLocation, on_delete=models.CASCADE, related_name='sublocations')
    status = models.BooleanField(default=True)

    def __str__(self):
        return self.name

    class Meta:
        unique_together = ['name', 'branch_location']  # Unique name per location


# Pincode table
class Pincode(models.Model):
    pincode = models.CharField(max_length=6, unique=True)
    branch_state = models.ForeignKey(BranchState, on_delete=models.CASCADE, related_name='pincodes')
    branch_location = models.ForeignKey(BranchLocation, on_delete=models.CASCADE, related_name='pincodes')
    sub_location = models.ForeignKey(SubLocation, on_delete=models.CASCADE, related_name='pincodes')
    status = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pincode} - {self.sub_location.name} / {self.branch_location.name} / {self.branch_state.name}"

    class Meta:
        ordering = ['-created_at']






class BranchInnerState(models.Model):
    name = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=True)  # Add this field
    
    def __str__(self):
        return self.name


# BranchInnerLocation: inner locations tied to an inner state and optional branch location
class BranchInnerLocation(models.Model):
    name = models.CharField(max_length=100)
    branch_inner_state = models.ForeignKey(BranchInnerState, on_delete=models.CASCADE, related_name='inner_locations')
    branch_location = models.ForeignKey(BranchLocation, on_delete=models.CASCADE, related_name='inner_locations', null=True, blank=True) # optional
    status = models.BooleanField(default=True)

    def __str__(self):
        return f"{self.name} ({self.branch_inner_state.name})"

    class Meta:
        unique_together = ['name', 'branch_inner_state']






class Bank(models.Model):
    bank_name = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=True)  # Add this field
    
    def __str__(self):
        return self.bank_name




class TypeOfAccount(models.Model):
    account_type = models.CharField(max_length=100, unique=True)
    status = models.BooleanField(default=True)  # Add this field
    
    def __str__(self):
        return self.account_type