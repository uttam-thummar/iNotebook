import React, {useState} from 'react'
import { useHistory } from 'react-router-dom';

function Login(props) {
    const [Credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();

    const collectingCredentials = (e) => {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    };

    const login = async (e) => {
        e.preventDefault();
        const apiCall = await fetch("http://localhost:5000/api/auth/login", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(Credentials)
        });
        const response = await apiCall.json();
        if(response.success){
            // save the token and redirect
            localStorage.setItem('authToken', response.authToken);
            props.configAlert(response.message,'success');
            history.push("/");
        }else{
            props.configAlert(response.message,'danger');
        }
    }

    return (
        <>
            <div className='container mt-2'>
                <h2>Login to continue to iNotebook</h2>
                <form onSubmit={login}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="email" name='email' value={Credentials.email} aria-describedby="emailHelp" onChange={collectingCredentials}/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" name='password' value={Credentials.password} onChange={collectingCredentials}/>
                    </div>
                    <button type="submit" className="btn btn-primary" id='liveToastBtn'>Login</button>
                </form>
            </div>
        </>
    )
}

export default Login
