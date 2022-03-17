from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import mysql

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r'*': {'origins': ['*']}})
    app.config.from_object(mysql)

    db.init_app(app)
    from . import models

    @app.route('/')
    def hello_pybo():
        return 'Hello Oasys!'

    from . import get_data, update_data
    app.register_blueprint(get_data.bp)
    app.register_blueprint(update_data.bp)

    return app
