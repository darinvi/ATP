from rest_framework import serializers
from app.models import Filing

class FilingSerializer(serializers.ModelSerializer):
    class Meta:
        model = Filing
        fields = '__all__'
