from flask import Flask
from flask import jsonify
from flask_cors import CORS, cross_origin
import sqlalchemy as db
from sqlalchemy import text
import json

# flask app
app = Flask(__name__)
app.config['JSON_AS_ASCII'] = False
CORS(app, resources={r'*': {'origins': ['*']}})

# db config
db_config = {
    'user': 'root',
    'password': '3376',
    'host': 'localhost',
    'port': 3306,
    'database': 'OasysDB'
}
DB_URL = f"mysql+mysqlconnector://{db_config['user']}:{db_config['password']}@{db_config['host']}:{db_config['port']}/{db_config['database']}?charset=utf8"

# db connect
engine = db.create_engine(DB_URL, encoding='utf-8', max_overflow=0)
connection = engine.connect()
metadata = db.MetaData()


@app.route('/')
def hello_oasys():
    return 'Hello, Oasys! (oasys api server)'


@app.route('/image_info/<id>', methods=['GET'])
def get_object(id):
    """특정 image 에 대한 정보 반환

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    # make query object
    table = db.Table('image_metadata', metadata,
                     autoload=True, autoload_with=engine)
    query = db.select([table]).where(table.columns.id == id)

    # execute query
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()

    # get query result
    anno_json = result_set[0]["annotation"]
    anno_json_object = json.loads(anno_json)
    imageURL = result_set[0]["image_url"]
    imageName = result_set[0]["image_name"]
    imageSize = result_set[0]["image_size"]

    # *** make result json ***
    result_json = {"imageURL": imageURL, "imageName": imageName,
                   "imageSize": imageSize, "annotation": anno_json_object}
    # http response : application/json
    return jsonify(result_json)


@app.route('/dataset/<id>', methods=['GET'])
def get_dataset(id):
    """특정 dataset에 대한 정보 반환

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    # *** make result json format ***
    result_json = {"datasetName": "", "objects": []}

    # make query object : dataset table
    dataset_table = db.Table(
        'dataset', metadata, autoload=True, autoload_with=engine)
    query = db.select([dataset_table]).where(dataset_table.columns.id == id)
    # execute query
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()
    # get query result : datasetName
    result_json["datasetName"] = result_set[0]["name"]

    # make query object : image_metadata table
    object_table = db.Table('image_metadata', metadata,
                            autoload=True, autoload_with=engine)
    query = db.select([object_table]).where(
        object_table.columns.dataset_id == id)
    # execute query
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()
    # get query result : image info of dataset
    for object in result_set:
        objectID = object["id"]
        imageURL = object["image_url"]
        imageName = object["image_name"]
        imageSize = object["image_size"]

        result_json["objects"].append(
            {"id": objectID, "imageURL": imageURL, "imageName": imageName, "imageSize": imageSize})

    # http response : application/json
    return jsonify(result_json)


@app.route('/user/<id>', methods=['GET'])
def get_user(id):
    """_summary_

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    # *** make result json format ***
    result_json = {"userName": "default", "dataset": []}

    # make query object
    table = db.Table('dataset', metadata,
                     autoload=True, autoload_with=engine)
    query = db.select([table])
    # execute query
    result_proxy = connection.execute(query)
    result_set = result_proxy.fetchall()
    result_list = [dict(row) for row in result_set]

    # http response : application/json
    return jsonify(result_list)


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)
