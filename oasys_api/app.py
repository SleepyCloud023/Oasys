from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
import sqlalchemy as db
import json

app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False

CORS(app, resources={r'*': {'origins': ['*']}})

@app.route('/')
def hello_oasys():
    return 'Hello, Oasys! (oasys api server)'

@app.route('/image_info/<id>', methods = ['GET'])
def get_object(id):
    db_config = {
        'user'     : 'root', 		# 1)
        'password' : '3376', 		# 2)
        'host'     : 'localhost', 	# 3)
        'port'     : 3306, 			# 4)
        'database' : 'OasysDB'		# 5)
    }
    DB_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8"

    engine = db.create_engine(DB_URL, encoding = 'utf-8', max_overflow = 0)

    connection = engine.connect()
    metadata = db.MetaData()
    table = db.Table('annotation_object', metadata, autoload = True, autoload_with = engine)


    # select * from table 과 같음
    query = db.select([table]).where(table.columns.id == id)

    # 쿼리 실행
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()

    # 결과 print 이때 10개만 출력하도록 함. 단순한 set 자료구조의 형태를 하고 있음.
    anno_json=result_set[0]["annotation"]
    anno_json_object = json.loads(anno_json)
    imageURL = result_set[0]["image_url"]
    imageName = result_set[0]["image_name"]
    imageSize = result_set[0]["image_size"]

    result_json = {"imageURL": imageURL, "imageName": imageName, "imageSize": imageSize, "annotation": anno_json_object}

    return jsonify(result_json)

if __name__ == '__main__':
    app.run(host = '0.0.0.0', port = 5000, debug = True) 
