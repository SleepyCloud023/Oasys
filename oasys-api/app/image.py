import os
from flask import Blueprint, send_file

bp = Blueprint('image', __name__, url_prefix='/')


@bp.route('/img/<image_file>', methods=['GET'])
def get_image(image_file):
    filename = os.getcwd()+'/img/'+image_file

    # if request.args.get('type') == '1':
    #    filename = 'images/'+image_file+'.png'
    # else:
    #    filename = 'error.gif'

    return send_file(filename, mimetype='image/png')
