from flask import Flask
from flask import send_file
from flask_cors import CORS, cross_origin
import os


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r'*': {'origins': ['*']}})

    @app.route('/')
    def hello_oasys():
        return 'Hello, Oasys! (oasys image server)'

    @app.route('/img/<image_file>', methods=['GET'])
    def get_image(image_file):
        filename = os.getcwd()+'/img/'+image_file

        # if request.args.get('type') == '1':
        #    filename = 'images/'+image_file+'.png'
        # else:
        #    filename = 'error.gif'

        return send_file(filename, mimetype='image/png')

    return app
