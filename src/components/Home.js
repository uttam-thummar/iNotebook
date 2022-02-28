import React, {useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { authActionCreators, toastActionCreators } from '../redux/actionCreators';
import Notes from './Notes';

function Home() {
    let history = useHistory();
    const dispatch = useDispatch();
    const {setAuthStatus} = bindActionCreators(authActionCreators, dispatch);
    const {setToastConfiguration} = bindActionCreators(toastActionCreators, dispatch);

    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            setAuthStatus(false,null);
            setToastConfiguration("Session Expired.", "warning");
        }
        //eslint-disable-next-line
    }, []);

    return (
        <>
            <div>
                <Notes />
            </div>
        </>
    )
}

export default Home
