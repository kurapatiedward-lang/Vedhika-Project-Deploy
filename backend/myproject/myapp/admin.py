from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from .models import User

class UserAdmin(BaseUserAdmin):
    # Fields to display in admin list
    list_display = ("email", "full_name", "role", "is_staff", "is_superuser", "created_at")
    list_filter = ("role", "is_staff", "is_superuser")
    search_fields = ("email", "full_name")
    ordering = ("email",)

    # Fieldsets for editing user
    fieldsets = (
        (None, {"fields": ("email", "password")}),
        ("Personal info", {"fields": ("full_name", "contact_info")}),
        ("Permissions", {"fields": ("role", "is_active", "is_staff", "is_superuser", "groups", "user_permissions")}),
        ("Important dates", {"fields": ("last_login", "date_joined")}),
    )

    # Fields for adding user
    add_fieldsets = (
        (None, {
            "classes": ("wide",),
            "fields": ("email", "full_name", "role", "password1", "password2"),
        }),
    )

    filter_horizontal = ("groups", "user_permissions")

# Register User model with custom admin
admin.site.register(User, UserAdmin)
