from django.contrib import admin
from .models import Tag, JournalComment, DailyJournal

class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'name', 'user')
    search_fields = ('name',)
    list_filter = ('user',)
admin.site.register(Tag, TagAdmin)

admin.site.register(JournalComment)

class DailyJournalAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'date')  
    filter_horizontal = ('tags',)
admin.site.register(DailyJournal, DailyJournalAdmin)