import React, {useState, useEffect, useRef} from 'react'
import { Link, useHistory } from 'react-router-dom';
import "../css/login_register.css";
import $ from "jquery";
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators, toastActionCreators } from '../redux/actionCreators';

function Login() {
    const dispatch = useDispatch();
    const {setAuthStatus} = bindActionCreators(authActionCreators,dispatch);
    const {setToastConfiguration} = bindActionCreators(toastActionCreators, dispatch);
    const emailInputRef = useRef(null);

    const API_URL = process.env.NODE_ENV === 'development' ? process.env.REACT_APP_API_URL_LOCAL : process.env.REACT_APP_API_URL_LIVE

    useEffect(() => {
        checkLogin();
        emailInputRef.current.focus();
    }, []);

    const checkLogin = () => {
        const authToken = localStorage.getItem('authToken');
        if(authToken){
            setAuthStatus(true,authToken);
            setToastConfiguration("Your Session is Active.", "info");
        }
    }

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
            const apiCall = await fetch(`${API_URL}/api/auth/login`, {
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
                setAuthStatus(true, response.authToken);
                setToastConfiguration(response.message,'success');
                history.push("/admin");
            }else if(response.errors){
                response.errors.forEach(error => {
                    if(error.param === "email"){
                        invalidInputs("email",error.msg);
                    }else if(error.param === "password"){
                        invalidInputs("password",error.msg);
                    }
                });
            }else{
                setToastConfiguration(response.message,'danger');
            }
        }else{
            setToastConfiguration("Enter Valid Credentials.",'warning');
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
                <div className='box'>
                    <h1 className='mb-5'><span className='mdi mdi-alpha-i-box primary-text'>Notebook</span></h1>
                    <form onSubmit={login} className='form-box'>
                        <h5 className="secondary-text">Welcome Back !</h5>
                        <p className="text-muted mb-4">Login to continue to INotebook.</p>
                        <div className='wrapper'>
                            <input type="email" ref={emailInputRef} id="email" name='email' value={Credentials.email} onChange={collectingCredentials} spellCheck="false" required/>
                            <div className='label' id='emailLabel'>Email Address</div>
                            <div className='validation' id='emailValidation'></div>
                            <span className='mdi mdi-email-outline icon' id='emailIcon'></span>
                        </div>
                        <div className='wrapper'>
                            <input type="password" id="password" name='password' value={Credentials.password} onChange={collectingCredentials} required/>
                            <div className='label' id='passwordLabel'>Password</div>
                            <div className='validation' id='passwordValidation'></div>
                            <span className='mdi mdi-lock-outline icon' id='passwordIcon'></span>
                        </div>
                        <div>
                            <button type="submit" className='btn-login' id='login'>Login</button>
                        </div>
                        <p>Don't have an account? <Link className='button-link' to="/register">Register</Link></p>
                    </form>
                    <p style={{fontSize: "16px"}} className='mt-5'>&copy; 2022 <span className='mdi mdi-alpha-i-box primary-text'>Notebook</span>. Crafted with <span style={{color: "#f00"}}>&hearts;</span></p>
                </div>
            </div>
        </>
    )
}

export default Login
