import React, {useEffect} from 'react'
import { useHistory } from 'react-router-dom';
import Notes from './Notes';

function Home(props) {
    let history = useHistory();
    useEffect(() => {
        if(!localStorage.getItem('authToken')){
            history.push('/login');
        }
        //eslint-disable-next-line
    }, []);
    return (
        <>
            <div>
                <Notes configToast={props.configToast}/>
            </div>
        </>
    )
}

export default Home
