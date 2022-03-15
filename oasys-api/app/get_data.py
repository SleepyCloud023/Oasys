import json
from flask import Blueprint
from flask import jsonify
from .models import User, Dataset, ImageMetadata

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/image_info/<id_>', methods=['GET'])
def get_object(id_):
    """특정 image 에 대한 정보 반환

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    query = ImageMetadata.query.filter_by(id=id_).first()
    anno_json = query.annotation
    anno_json = json.loads(anno_json)

    result_json = {"imageURL": query.image_url, "imageName": query.image_name,
                   "imageSize": query.image_size, "annotation": anno_json}

    return jsonify(result_json)


@bp.route('/dataset/<id_>', methods=['GET'])
def get_dataset(id_):
    """특정 dataset에 대한 정보 반환

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    result_json = {"datasetName": "", "image_metadata": []}

    query = Dataset.query.filter_by(id=id_).first()
    result_json["datasetName"] = query.name

    query = ImageMetadata.query.filter_by(dataset_id=id_).all()
    for row in query:
        result_json["image_metadata"].append({"id": row.id, "imageURL": row.image_url,
                                              "imageName": row.image_name, "imageSize": row.image_size})

    return jsonify(result_json)


@bp.route('/user', methods=['GET'])
def get_user():
    """_summary_

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    result_json = {"userName": "root", "dataset": []}

    query = Dataset.query.all()
    for row in query:
        result_json["dataset"].append({"id": row.id, "name": row.name})

    return jsonify(result_json)
