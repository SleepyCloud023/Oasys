from flask      import Flask, request, jsonify, current_app
from sqlalchemy import create_engine, text

#@app.route('/')
#def hello_oasys():
#   return 'Hello, Oasys!'

class CustomJSONEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, set):
            return list(obj)

        return JSONEncoder.default(self, obj)

def create_app(test_config = None):
    app = Flask(__name__)
    print(dir(app))

    app.json_encoder = CustomJSONEncoder

    if test_config is None:
        app.config.from_pyfile("config.py")
    else:
        app.config.update(test_config)


    console.log(app.config['DB_URL'])
    database = create_engine(app.config['DB_URL'], encoding = 'utf-8', max_overflow = 0)
    app.database = database
    
    return app