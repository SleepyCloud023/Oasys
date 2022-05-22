from dataCRUD.models import Dataset
from modules.delete import delete_dataset


def delete(id):
    dataset = Dataset.objects.get(id=id)
    delete_dataset(dataset)
    print("Success!")
