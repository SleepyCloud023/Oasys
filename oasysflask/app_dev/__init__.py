from flask import Flask
from flask_cors import CORS
from oauth2client.contrib.flask_util import UserOAuth2


app = Flask(__name__)
CORS(app, resources={r'*': {'origins': ['*']}})

app.config['SECRET_KEY'] = 'temp_key'
app.config['GOOGLE_OAUTH2_CLIENT_SECRETS_FILE'] = 'config/client_secret.json'
oauth2 = UserOAuth2(app)


@app.route('/')
def hello_oasys():
    return 'Hello, Oasys! (oasys dev server)'


@app.route('/optional')
def optional():
    if oauth2.has_credentials():
        return 'Credentials found!'
    else:
        return 'No credentials!'


@app.route('/info')
@oauth2.required
def info():
    return "Hello, {} ({})".format(oauth2.email, oauth2.user_id)


@app.route('/callback')
@oauth2.required
def callback():
    return "callback"
