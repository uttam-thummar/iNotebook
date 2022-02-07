import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect } from 'react-router-dom';
import { Route } from 'react-router-dom';

const PrivateRoute = ({ path, component: Component, configToast, ...rest }) => {
    const isAuth = useSelector(state => state.admin.isAuth);
    return isAuth ? (
        <Route path={path}  component={() => <Component configToast={configToast}/>} {...rest}/>
    ) : (
        <Redirect to="/login" />
    );
}

export default PrivateRoute
