from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy
import config

db = SQLAlchemy()


def create_app():
    app = Flask(__name__)
    CORS(app, resources={r'*': {'origins': ['*']}})
    app.config.from_object(config)

    db.init_app(app)
    import models

    @app.route('/')
    def hello_pybo():
        return 'Test Channel'

    import get_data
    app.register_blueprint(get_data.bp)

    return app


if __name__ == '__main__':
    app = create_app()
    app.run(host='0.0.0.0', port=5002, debug=True)
