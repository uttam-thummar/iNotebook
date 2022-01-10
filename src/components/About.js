import React, { useContext, useEffect } from 'react'
import { useHistory } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'

function About() {
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/login');
        }
        //eslint-disable-next-line
    }, []);
    return (
        <>
            This is About Page
        </>
    )
}

export default About
