import React, { useReducer, useContext, useState } from 'react'
import { Context } from '../context/GlobalContext'

const reducer = (state, action) => {
    switch (action.type) {
        case 'email':
            return { ...state, email: action.value }
        case 'password':
            return { ...state, password: action.value }
        default:
            return state
    }
}

const Login = () => {
    const { actions } = useContext(Context)
    const [validated, setValidated] = useState(false)

    const [credentials, dispatch] = useReducer(reducer, {
        email: '',
        password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() == false) {
            e.stopPropagation();
            setValidated(true);
        } else {
            await actions.login(credentials)
        }
    }

    return (
        <div className='container-fluid pt-nb mt-3 d-flex justify-content-center'>
            <div className='card col-12 col-sm-8 col-md-6'>
                <form className='card-body needs-validation' noValidate onSubmit={handleSubmit}>
                    <h1 className='text-center'>Login</h1>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" placeholder='example@email.com' aria-describedby="emailFeedBack"
                            onChange={e => dispatch({ type: 'email', value: e.target.value })} required />
                        {(validated && !credentials?.email) && <p className='text-danger'>Please enter your email</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder='******' aria-describedby='passwordFeedback'
                            onChange={e => dispatch({ type: 'password', value: e.target.value })} required />
                        {(validated && !credentials?.password) && <p className='text-danger'>Please enter your password</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Login;
