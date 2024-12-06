from rest_framework import serializers

class ValueSerializer(serializers.Serializer):
    paytype_id = serializers.IntegerField()
    amount = serializers.FloatField()
    date = serializers.DateField()
    provider_id = serializers.CharField()
    employee_type_id = serializers.IntegerField()

class CategorySerializer(serializers.Serializer):
    paytype_id = serializers.DictField()
    provider_id = serializers.DictField()
    employee_type_id = serializers.DictField()
