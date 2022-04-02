from flask import Blueprint, Response, jsonify, request, session, make_response
from flask_cors import cross_origin
from .models import User
from werkzeug.security import check_password_hash

bp = Blueprint('auth', __name__, url_prefix='/')


@bp.route('/login', methods=['POST'])
@cross_origin(supports_credentials=True)
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
        session['user_id'] = {"db_id": target_user.id,
                              "login_id": target_user.login_id}
        result['id'] = login_req["id"]

    resp = make_response(jsonify(result))
    return resp


@bp.route('/login_check', methods=['GET'])
@cross_origin(supports_credentials=True)
def login_check():
    user_id = session.get('user_id')
    if user_id is None:
        return jsonify({"login": False})
    else:
        return jsonify({"login": True, "user_id": user_id["login_id"]})


# @bp.before_app_request
# def load_logged_in_user():
#     user_id = session.get('user_id')
#     if user_id is None:
#         g.user = None
#     else:
#         g.user = user_id
