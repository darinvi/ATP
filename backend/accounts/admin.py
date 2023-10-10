from django.contrib import admin
from .models import Mentors

@admin.register(Mentors)
class MentorsAdmin(admin.ModelAdmin):
    list_display = ('user',)  # Fields to display in the list view
    search_fields = ('user__username',)  # Fields to search in th