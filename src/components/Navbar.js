import React from 'react';
import { Link, useLocation, useHistory } from "react-router-dom";

function Navbar(props) {
    let location = useLocation();
    let history = useHistory();
    const logout = () => {
        localStorage.removeItem('authToken');
        props.configToast("You are Logged out now.", "success")
        history.push('/');
    }
    return (
        <>
            <nav className="navbar sticky navbar-expand-lg navbar-dark bg-dark pt-0 pb-0">
                <div className="container-fluid">
                    <Link className="navbar-brand d-flex align-items-center" to="/home">
                        <i className='mdi mdi-alpha-i-box' style={{fontSize: "40px"}}></i>Notebook
                    </Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/home" ? "active" : ""}`} aria-current="page" to="/home">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className={`nav-link ${location.pathname==="/about" ? "active" : ""}`} to="/about">About</Link>
                            </li>
                        </ul>
                        {!localStorage.getItem('authToken') ? <div className="d-flex">
                            <Link className="btn btn-outline-success mx-1" to="/login" role="button">Login</Link>
                            <Link className="btn btn-primary mx-1" to="/register" role="button">Register</Link>
                        </div>: <button className="btn btn-danger text-dark mx-1" onClick={logout}>Logout</button>}
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar
