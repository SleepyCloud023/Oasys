from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
from config import mysql
from datetime import timedelta

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    app.config.from_object(mysql)
    #app.config['SESSION_COOKIE_SAMESITE'] = 'None'
    #app.config["SESSION_COOKIE_SECURE"] = True
    app.config["SECRET_KEY"] = "oasys_api_flask"
    #app.config["PERMANENT_SESSION_LIFETIME"] = timedelta(minutes=1)
    CORS(app, supports_credentials=True, resources={
         r'*': {'origins': ['http://oasys.ml', 'http://localhost:3000']}})

    db.init_app(app)
    from . import models

    @app.route('/api')
    def hello_pybo():
        return 'Hello Oasys!'

    from . import get_data, update_data, image, auth
    app.register_blueprint(get_data.bp)
    app.register_blueprint(update_data.bp)
    app.register_blueprint(image.bp)
    app.register_blueprint(auth.bp)

    return app
