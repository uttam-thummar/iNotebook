import React from 'react'
import { useSelector } from 'react-redux'
import { Redirect, Route } from 'react-router-dom';

const AuthRoute = ({ path, component: Component, ...rest }) => {
    const isAuth = useSelector(state => state.admin.isAuth);
    return isAuth ? (
        <Redirect to="/admin" />
    ) : (
        <Route path={path} component={Component} {...rest} />
    )
}

export default AuthRoute;
