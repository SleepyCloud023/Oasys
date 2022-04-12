from django.http import HttpResponse, HttpResponseNotFound
import os


def image(request, image_file):
    file_location = 'img/'+image_file
    print(os.getcwd())
    print(file_location)

    try:
        with open(file_location, 'rb') as f:
            file_data = f.read()

        response = HttpResponse(file_data, content_type='image/png')
        response['Content-Disposition'] = 'inline; filename='+image_file

    except IOError:
        response = HttpResponseNotFound('<h1>File not exist</h1>')

    return response
