import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

function Register(props) {
    const [RegistrationDetails, setRegistrationDetails] = useState({name: "", email: "", password: ""});
    let history = useHistory();

    const collectingDetails = (e) => {
        setRegistrationDetails({...RegistrationDetails, [e.target.name]: e.target.value});
    };

    const register = async (e) => {
        e.preventDefault();
        const apiCall = await fetch("http://localhost:5000/api/auth/register", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(RegistrationDetails)
        });
        const response = await apiCall.json();
        if(response.success){
            // save the token and redirect
            localStorage.setItem('authToken', response.authToken);
            history.push("/");
            props.configAlert(response.message,'success');
        }else{
            props.configAlert(response.message,'danger');
        }
    }
    return (
        <>
            <div className='container mt-2'>
                <h2>Register to use iNotebook</h2>
                <form onSubmit={register}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Full Name</label>
                        <input type="text" className="form-control" id="name" name="name" value={RegistrationDetails.name} onChange={collectingDetails}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name="email" value={RegistrationDetails.email} aria-describedby="emailHelp" onChange={collectingDetails}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name="password" value={RegistrationDetails.password} onChange={collectingDetails}/>
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </>
    )
}

export default Register
