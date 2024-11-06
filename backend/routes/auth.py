from flask import Blueprint, request, jsonify
from models import User
from flask_jwt_extended import create_access_token
from werkzeug.security import generate_password_hash, check_password_hash

bp_auth = Blueprint('bp_auth', __name__)

@bp_auth.route('/signup', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email:
        return jsonify({'status': 'error', 'message': 'Email is required'}), 422
    
    if not password:
        return jsonify({'status': 'error', 'message': 'Password is required'}), 422
    
    if not username:
        return jsonify({'status': 'error', 'message': 'User is required'}), 422
    
    founded_email = User.query.filter_by(email=email)
    founded_username = User.query.filter_by(username=username)

    if founded_email:
        return jsonify({'status': 'error', 'message': 'Email is already in use'}), 422

    if founded_username:
        return jsonify({'status': 'error', 'message': 'Username is already in use'}), 422
    
    user = User()
    user.username = username
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    if user:
        return jsonify({'status': 'success', 'message': 'User created successfully', 'user': user.serialize()}), 201

    return jsonify({'status': 'fail', 'message': 'Register fail, please try later'}), 201

@bp_auth.route('/login', methods=['POST'])
def login():
    data = request.json
    email = data.get('email')
    password = data.get('password')

    if not email:
        return jsonify({"status": "error", "message": "Email is required"}), 422
    
    if not password:
        return jsonify({"status": "error", "message": "Password is required"}), 422

    founded_account = User.query.filter_by(email=email).first()

    if not founded_account:
        return jsonify({'status': 'error', 'message': 'Wrong credentials, try again'}), 401

    if check_password_hash(founded_account.password, password):
        return jsonify({'status': 'error', 'message': 'Wrong credentials, try again'}), 401

    if founded_account:
        access_token = create_access_token(identity=founded_account.id)
        data = {
            'access_token': access_token,
            'user': founded_account.serialize()
        }
        return jsonify({'status': 'success', 'message': 'Login successfully', 'data': data}), 200

    return jsonify({'status': 'fail', 'message': 'Login fail, please try later'}), 400

