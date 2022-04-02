import json
from flask import Blueprint, jsonify, request
from .models import User, Dataset, ImageMetadata
from app import db

bp = Blueprint('update_data', __name__, url_prefix='/')


@bp.route('/image_info/<id_>', methods=['POST'])
def update_data(id_):
    result = {"success": True}
    if request.is_json is False:
        result = {"success": False,
                  "error_msg": "Posted data is not in json format"}

    target_data = ImageMetadata.query.get(id_)
    if target_data is None:
        result = {"success": False,
                  "error_msg": "Image Metadata table does not have a record with that id."}

    if result["success"] is True:
        anno_json = request.get_json()
        anno_str = json.dumps(anno_json)
        target_data.annotation = anno_str
        db.session.commit()
    return jsonify(result)
