from collections import UserString
from flask import Blueprint
from models import User

bp = Blueprint('main', __name__, url_prefix='/')


@bp.route('/user')
def get_user():
    result_json = {}
    print(User.query.all())

    return 'User data'
