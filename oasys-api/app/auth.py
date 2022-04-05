from flask import Blueprint, jsonify, request, session
from .models import User
from werkzeug.security import check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/')


# @cross_origin(supports_credentials=True)
@bp.route('api/login', methods=['POST'])
def login():
    result = {"success": True}
    if request.is_json is False:
        result = {"success": False,
                  "error_msg": "Posted data is not in json format"}

    login_req = request.get_json()
    target_user = User.query.filter_by(login_id=login_req["id"]).first()
    if target_user is None:
        result = {"success": False,
                  "error_msg": "invalid ID or Password"}
    elif not check_password_hash(target_user.login_password, login_req["password"]):
        result = {"success": False,
                  "error_msg": "invalid ID or Password"}

    if result["success"] is True:
        session.clear()
        session['id'] = {"db_id": target_user.id,
                         "login_id": target_user.login_id}
        result['login_id'] = login_req["id"]

    return result


# @cross_origin(supports_credentials=True)
@bp.route('api/login_check', methods=['GET'])
def login_check():
    user_id = session.get('id')
    if user_id is None:
        return {"login": False}
    else:
        return {"login": True, "login_id": user_id["login_id"]}


@bp.route('api/logout', methods=['GET'])
def logout():
    session.clear()
    return {'logout': True}

# @bp.before_app_request
# def load_logged_in_user():
#     user_id = session.get('user_id')
#     if user_id is None:
#         g.user = None
#     else:
#         g.user = user_id
