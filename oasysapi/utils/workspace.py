from common.models import Workspace


def create(name):
    workspace = Workspace.objects.create(workspace_name=name)
    print("Success!")

#from datetime import datetime
#workspace.modification_date = datetime.now()
