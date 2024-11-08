import { useReducer, useContext, useState, useEffect } from "react";
import { Context } from "../context/GlobalContext";
import { useNavigate } from "react-router-dom";

const reducer = (state, action) => {
    switch (action.type) {
        case 'current_password':
            return { ...state, current_password: action.value }
        case 'new_password':
            return { ...state, new_password: action.value }
        default:
            return state
    }
}

const Private = () => {
    const { actions, user } = useContext(Context)
    const [validated, setValidated] = useState(false)
    const navigate = useNavigate()

    const [passwords, dispatch] = useReducer(reducer, {
        current_password: '',
        new_password: ''
    })

    const handleSubmit = async e => {
        e.preventDefault();
        const form = e.currentTarget;
        if (form.checkValidity() == false) {
            setValidated(true);
        } else {
            const status = await actions.changePassword(passwords);
            (status == 'success') && navigate('/');
        }
    }

    useEffect(() => {
        !user && navigate('/login');
    }, [user]);

    return (
        <div className='container-fluid pt-nb mt-3 d-flex justify-content-center'>
            <div className='card col-12 col-sm-9 col-md-7 col-lg-5'>
                <form className='card-body needs-validation' noValidate onSubmit={handleSubmit}>
                    <h1 className='text-center'>Change password</h1>
                    <div className="mb-3">
                        <label htmlFor="current_password" className="form-label">Current password</label>
                        <input type="password" className="form-control" id="current_password" placeholder='******' aria-describedby="emailFeedBack"
                            onChange={e => dispatch({ type: 'current_password', value: e.target.value })} required />
                        {(validated && !passwords?.current_password) && <p className='text-danger'>Please enter your current password</p>}
                    </div>
                    <div className="mb-3">
                        <label htmlFor="new_password" className="form-label">New password</label>
                        <input type="password" className="form-control" id="new_password" placeholder='******' aria-describedby='passwordFeedback'
                            onChange={e => dispatch({ type: 'new_password', value: e.target.value })} required />
                        {(validated && !passwords?.new_password) && <p className='text-danger'>Please enter a new password</p>}
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>
            </div>
        </div>
    );

}
export default Private;