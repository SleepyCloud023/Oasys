from rest_framework import serializers
from dataCRUD.models import Dataset, ImageMetadata, User


class TutorialSerializer(serializers.ModelSerializer):

    class Meta:
        model = Dataset
        fields = ('id',
                  'name',
                  'creation_date',
                  'modification_date',
                  'rep_image')
