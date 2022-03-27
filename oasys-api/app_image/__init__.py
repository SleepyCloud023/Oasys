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

    return app
