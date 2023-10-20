from django.contrib import admin
from .models import TraineeQuestion, MentorAnswer

class TraineeQuestionAdmin(admin.ModelAdmin):
    list_display = ('id', 'answered', 'description', 'question_type', 'anonymous', 'user')
    list_filter = ('answered', 'question_type', 'anonymous')
    search_fields = ('description', 'question')

class MentorAnswerAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'question')
    list_filter = ('user',)
    search_fields = ('answer',)

admin.site.register(TraineeQuestion, TraineeQuestionAdmin)
admin.site.register(MentorAnswer, MentorAnswerAdmin)