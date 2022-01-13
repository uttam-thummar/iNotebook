import React, {useState,useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import "../css/login_register.css";
import $ from "jquery";

function Register(props) {
    const [RegistrationDetails, setRegistrationDetails] = useState({name: "", email: "", password: ""});
    let history = useHistory();

    const collectingDetails = (e) => {
        setRegistrationDetails({...RegistrationDetails, [e.target.name]: e.target.value});
    };
    const register = async (e) => {
        e.preventDefault();
        var emailRegx = /^([a-z0-9.-]+)@([a-z0-9-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/;
        var validStatus = true;

        if(RegistrationDetails.name === ""){
            $("#nameLabel").removeClass("focus-label");
            invalidInputs("name", "Required!");
            validStatus = false;
        }else{
            validInputs("name");
        }

        if(RegistrationDetails.email === ""){
            $("#emailLabel").removeClass("focus-label");
            invalidInputs("email", "Required!");
            validStatus = false;
        }else if(emailRegx.test(RegistrationDetails.email) === false){
            $("#emailLabel").addClass("focus-label");
            invalidInputs("email", "Enter valid email!");
            validStatus = false;
        }else{
            validInputs("email")
        }

        if(RegistrationDetails.password === ""){
            $("#passwordLabel").removeClass("focus-label");
            invalidInputs("password", "Required!");
            validStatus = false;
        }else if(RegistrationDetails.password.length < 5 ){
            $("#passwordLabel").addClass("focus-label");
            invalidInputs("password", "Password must be atleast 5 characters long!");
            validStatus = false;
        }else{
            validInputs("password");
        }

        if(validStatus === true){
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
                props.configToast(response.message,'success');
            }else if(response.errors){
                response.errors.forEach(error => {
                    if(error.param === "name"){
                        invalidInputs("name",error.msg);
                    }else if(error.param === "email"){
                        invalidInputs("email",error.msg);
                    }else if(error.param === "password"){
                        invalidInputs("password",error.msg);
                    }
                });
            }else{
                props.configToast(response.message,'danger');
            }
        }else{
            props.configToast("Enter Valid Details.",'warning');
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
        if(RegistrationDetails.name === ""){
            $("#nameLabel").removeClass("focus-label");
        }else{
            $("#nameLabel").addClass("focus-label");
        }
        return () => {
            //cleanup
        }
    }, [RegistrationDetails.name]);
    useEffect(() => {
        if(RegistrationDetails.email === ""){
            $("#emailLabel").removeClass("focus-label");
        }else{
            $("#emailLabel").addClass("focus-label");
        }
        return () => {
            //cleanup
        }
    }, [RegistrationDetails.email]);
    useEffect(() => {
        if(RegistrationDetails.password === ""){
            $("#passwordLabel").removeClass("focus-label");
        }else{
            $("#passwordLabel").addClass("focus-label");
        }
        return () => {
            //cleanup
        }
    }, [RegistrationDetails.password]);

    return (
        <>
            <div className='container mt-2'>
                <form onSubmit={register} className='box'>
                    <h2 className='mb-5'>Register</h2>
                    <div className='wrapper'>
                        <input type="text" id="name" name='name' value={RegistrationDetails.name} onChange={collectingDetails} spellCheck="false" required/>
                        <div className='label' id='nameLabel'>Full Name</div>
                        <div className='validation' id='nameValidation'></div>
                        <span className='mdi mdi-account-outline icon' id='nameIcon'></span>
                    </div>
                    <div className='wrapper'>
                        <input type="email" id="email" name='email' value={RegistrationDetails.email} onChange={collectingDetails} spellCheck="false" required/>
                        <div className='label' id='emailLabel'>Email Address</div>
                        <div className='validation' id='emailValidation'></div>
                        <span className='mdi mdi-email-outline icon' id='emailIcon'></span>
                    </div>
                    <div className='wrapper'>
                        <input type="password" id="password" name='password' value={RegistrationDetails.password} onChange={collectingDetails} required/>
                        <div className='label' id='passwordLabel'>Password</div>
                        <div className='validation' id='passwordValidation'></div>
                        <span className='mdi mdi-key-outline icon' id='passwordIcon'></span>
                    </div>
                    <div>
                        <button type="submit" className='btn-login' id='register'>Register</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default Register
