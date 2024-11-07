import datetime
from flask import Blueprint, request, jsonify
from models import User
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash

bp_auth = Blueprint('bp_auth', __name__)


@bp_auth.route('/register', methods=['POST'])
def register():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    username = data.get('username')

    if not email:
        return jsonify({'status': 'error', 'message': 'Email is required'}), 400
    
    if not password:
        return jsonify({'status': 'error', 'message': 'Password is required'}), 400
    
    if not username:
        return jsonify({'status': 'error', 'message': 'Username is required'}), 400
    
    founded_email = User.query.filter_by(email=email).first()
    print(founded_email)
    founded_username = User.query.filter_by(username=username).first()

    if founded_email:
        return jsonify({'status': 'error', 'message': 'Email is already in use'}), 409

    if founded_username:
        return jsonify({'status': 'error', 'message': 'Username is already in use'}), 409
    
    user = User()
    user.username = username
    user.email = email
    user.password = generate_password_hash(password)
    user.save()

    if user:
        access_token = create_access_token(identity=user.id, expires_delta=datetime.timedelta(days=1))
        data = {
            access_token: access_token,
            user: user.serialize()
        }
        return jsonify({'status': 'success', 'message': 'User created successfully', 'data': data}), 201

    return jsonify({'status': 'fail', 'message': 'Register fail, please try later'}), 408


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

    if not check_password_hash(founded_account.password, password):
        return jsonify({'status': 'error', 'message': 'Wrong credentials, try again'}), 401

    if founded_account:
        expire = datetime.timedelta(minutes=5)
        print(expire)
        access_token = create_access_token(identity=founded_account.id, expires_delta=datetime.timedelta(days=1))
        data = {
            'access_token': access_token,
            'user': founded_account.serialize()
        }
        return jsonify({'status': 'success', 'message': 'Login successfully', 'data': data}), 200

    return jsonify({'status': 'fail', 'message': 'Login fail, please try later'}), 408


@bp_auth.route('/session', methods=['GET'])
@jwt_required()
def session_recovery():
    user_id = get_jwt_identity()
    print(user_id)
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'status': 'error', 'message': 'Invalid session'}), 403

    return jsonify({'status': 'success', 'message': 'Session validated successfully', 'user': user.serialize()})

@bp_auth.route('/password', methods=['PATCH'])
@jwt_required()
def change_password():
    user_id = get_jwt_identity()
    user = User.query.filter_by(id=user_id).first()

    if not user:
        return jsonify({'status': 'error', 'message': 'User is not authorized'}), 401
    
    data = request.json
    current_password = data.get('current_password')
    new_password = data.get('new_password')

    if not current_password:
        return jsonify({'status': 'error', 'message': "Current password is required"}), 422
    
    if not new_password:
        return jsonify({'status': 'error', 'message': "New password is required"}), 422
    
    if not check_password_hash(user.password, current_password):
        return jsonify({'status': 'error', 'message': 'Incorrent password'}), 401
    
    if user:
        user.password = generate_password_hash(new_password)
        user.update()
        return jsonify({'status': 'success', 'message': 'Password changed successfully'}), 200
    

    return jsonify({'status': 'fail', 'message': 'Request fail, please tray later'}), 408 