from django.contrib import admin
from django.contrib.auth.models import User, Group
from django.contrib.auth.admin import UserAdmin
from django.utils.html import format_html
from django.urls import path, reverse
from django.http import HttpResponseRedirect
from django.contrib import messages

# Admin site konfigürasyonu
admin.site.site_header = "🌟 Bulutistan Yönetim Paneli"
admin.site.site_title = "Bulutistan Admin"
admin.site.index_title = "🚀 Yönetim Paneli - Hoş Geldiniz!"

# User model için özel admin
class CustomUserAdmin(UserAdmin):
    list_display = ('username', 'email', 'first_name', 'last_name', 'is_staff', 'is_active', 'date_joined')
    list_filter = ('is_staff', 'is_superuser', 'is_active', 'groups', 'date_joined')
    search_fields = ('username', 'first_name', 'last_name', 'email')
    ordering = ('-date_joined',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Kişisel Bilgiler', {'fields': ('first_name', 'last_name', 'email')}),
        ('İzinler', {
            'fields': ('is_active', 'is_staff', 'is_superuser', 'groups', 'user_permissions'),
        }),
        ('Önemli tarihler', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2'),
        }),
    )

# Group model için özel admin
class CustomGroupAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_count')
    search_fields = ('name',)
    
    def user_count(self, obj):
        return obj.user_set.count()
    user_count.short_description = 'Kullanıcı Sayısı'

# Admin paneli için özel view
class BulutistanAdminSite(admin.AdminSite):
    def get_app_list(self, request):
        app_list = super().get_app_list(request)
        # Ana sayfa için özel link ekle
        app_list.append({
            'name': 'Ana Sayfa',
            'app_label': 'bulutistan',
            'app_url': '/',
            'has_module_perms': True,
            'models': [{
                'name': 'Ana Sayfa',
                'object_name': 'home',
                'admin_url': '/',
                'view_only': True,
            }],
        })
        return app_list

# Admin site'ı kaydet
admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.register(User, CustomUserAdmin)
admin.site.register(Group, CustomGroupAdmin)

# Admin paneli için özel CSS ve JS
class Media:
    css = {
        'all': ('admin/css/custom_admin.css',)
    }
    js = ('admin/js/custom_admin.js',)
