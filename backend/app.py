import os
from flask import Flask, jsonify
from flask_migrate import Migrate
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from models import db
from dotenv import load_dotenv
from routes.auth import bp_auth

load_dotenv()

PATH = os.path.abspath('instance')

app = Flask(__name__, instance_path=PATH)
app.config['DEBUG'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = os.getenv('DATABASE_URI')
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET_KEY')

db.init_app(app)
Migrate(app, db)
jwt = JWTManager(app)
CORS(app)

app.register_blueprint(bp_auth)

@app.route('/')
def server_status():
    return jsonify({'message': 'Server is running'}), 200

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)