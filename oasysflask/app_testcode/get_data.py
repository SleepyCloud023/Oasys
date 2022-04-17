from flask import Blueprint
from .models import User, Dataset, ImageMetadata

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/user')
def get_user():
    result_json = {}
    print(User.query.all())

    return 'User data'


@bp.route('/image_info/<id>', methods=['GET'])
def get_object(id):
    """특정 image 에 대한 정보 반환

    Args:
        id (_type_): _description_

    Returns:
        _type_: _description_
    """

    # make query object

    #query = ImageMetadata.query.filter_by(id == id).first()
    # print(query.image_url)

    return "get object"
