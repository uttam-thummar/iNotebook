import React, {useState, useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import "../css/login_register.css";
import $ from "jquery";

function Login(props) {
    const [Credentials, setCredentials] = useState({email: "", password: ""});
    let history = useHistory();

    const collectingCredentials = (e) => {
        setCredentials({...Credentials, [e.target.name]: e.target.value});
    };
    const login = async (e) => {
        e.preventDefault();
        var emailRegx = /^([a-z0-9.-]+)@([a-z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        var validStatus = true;
        if(Credentials.email === ""){
            $("#emailLabel").removeClass("focus-label");
            invalidInputs("email", "Required!");
            validStatus = false;
        }else if(emailRegx.test(Credentials.email) === false){
            $("#emailLabel").addClass("focus-label");
            invalidInputs("email", "Enter valid email!");
            validStatus = false;
        }else{
            validInputs("email")
        }

        if(Credentials.password === ""){
            $("#passwordLabel").removeClass("focus-label");
            invalidInputs("password", "Required!");
            validStatus = false;
        }else{
            validInputs("password");
        }

        if(validStatus === true){
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
                props.configToast(response.message,'success');
                history.push("/");
            }else if(response.errors){
                response.errors.forEach(error => {
                    if(error.param === "email"){
                        invalidInputs("email",error.msg);
                    }else if(error.param === "password"){
                        invalidInputs("password",error.msg);
                    }
                });
            }else{
                props.configToast(response.message,'danger');
            }
        }else{
            props.configToast("Enter Valid Credentials.",'warning');
        }
    }

    const invalidInputs = (field, message) => {
        $(`#${field}Icon`).css("color", "#fd4444");
        $(`#${field}Validation`).addClass("invalid-msg");
        $(`#${field}Validation`).text(message);
    }
    const validInputs = (field) => {
        $(`#${field}Label`).addClass("focus-label");
        // $(`#${field}`).css("border-color", "#55d688");
        $(`#${field}Icon`).css("color", "#55d688");
        $(`#${field}Validation`).removeClass("invalid-msg");
    }

    useEffect(() => {
        if(Credentials.email === ""){
            $("#emailLabel").removeClass("focus-label");
        }else{
            $("#emailLabel").addClass("focus-label");
        }
        return () => {
            //cleanup
        }
    }, [Credentials.email]);
    useEffect(() => {
        if(Credentials.password === ""){
            $("#passwordLabel").removeClass("focus-label");
        }else{
            $("#passwordLabel").addClass("focus-label");
        }
        return () => {
            //cleanup
        }
    }, [Credentials.password]);

    return (
        <>
            <div className='container mt-2'>
                <form onSubmit={login} className='box'>
                    <h2 className='mb-5'>Login</h2>
                    <div className='wrapper'>
                        <input type="email" id="email" name='email' value={Credentials.email} onChange={collectingCredentials} spellCheck="false" required/>
                        <div className='label' id='emailLabel'>Email Address</div>
                        <div className='validation' id='emailValidation'></div>
                        <span className='mdi mdi-email-outline icon' id='emailIcon'></span>
                    </div>
                    <div className='wrapper'>
                        <input type="password" id="password" name='password' value={Credentials.password} onChange={collectingCredentials} required/>
                        <div className='label' id='passwordLabel'>Password</div>
                        <div className='validation' id='passwordValidation'></div>
                        <span className='mdi mdi-key-outline icon' id='passwordIcon'></span>
                    </div>
                    <div>
                        <button type="submit" className='btn-login' id='login'>Login</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Login
