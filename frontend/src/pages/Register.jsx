import React, { useReducer, useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context/GlobalContext'

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.value }
        case 'password':
            return { ...state, password: action.value }
        case 'username':
            return { ...state, username: action.value }
        default:
            return state
    }
}

const Register = () => {
    const { actions, user } = useContext(Context)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()


    const [credentials, dispatch] = useReducer(reducer, {
        email: '',
        password: '',
        username: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() == false) {
            setValidated(true);
        } else {
            await actions.register(credentials)
        }
    }

    useEffect(() => {
        user && navigate('/');
    }, [user]);

    return (
        <div className='container-fluid pt-nb mt-3 d-flex justify-content-center'>
            <div className='card col-12 col-sm-8 col-md-6'>
                <form className='card-body needs-validation' noValidate onSubmit={handleSubmit}>
                    <h1 className='text-center'>Register</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder='example@email.com' aria-describedby="emailFeedBack"
                            onChange={e => dispatch({ type: 'email', value: e.target.value })} required />
                        {(validated && !credentials?.email) && <p className='text-danger'>Please enter an email</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username</label>
                        <input type="text" className="form-control" id="username" placeholder='johndoe123' aria-describedby="emailFeedBack"
                            onChange={e => dispatch({ type: 'username', value: e.target.value })} required />
                        {(validated && !credentials?.username) && <p className='text-danger'>Please enter an username</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder='******' aria-describedby='passwordFeedback'
                            onChange={e => dispatch({ type: 'password', value: e.target.value })} required />
                        {(validated && !credentials?.password) && <p className='text-danger'>Please enter a password</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Register;
