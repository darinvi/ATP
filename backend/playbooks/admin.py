from django.contrib import admin
from .models import PlayBook, PlayBookComment

class PlayBookAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'date', 'public')
    search_fields = ('user__username',)


class PlayBookCommentAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'playbook', 'comment') 
    search_fields = ('user__username', 'playbook__id')


admin.site.register(PlayBook, PlayBookAdmin)
admin.site.register(PlayBookComment, PlayBookCommentAdmin)