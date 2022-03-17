import json
from flask import Blueprint, jsonify, request
from .models import User, Dataset, ImageMetadata
from app import db

bp = Blueprint('update_data', __name__, url_prefix='/')


@bp.route('/image_info/<id_>', methods=['POST'])
def update_data(id_):
    msg_false = jsonify({"succes": False})
    if request.is_json is False:
        return msg_false

    value = request.get_json()
    target_data = ImageMetadata.query.get(id_)
    if target_data is None:
        return msg_false

    anno_json = request.get_json()
    anno_str = json.dumps(anno_json)
    target_data.annotation = anno_str
    db.session.commit()

    return jsonify({"succes": True})
