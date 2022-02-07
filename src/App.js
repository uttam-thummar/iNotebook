import React, { lazy, Suspense, useState, useEffect } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Register from './components/Register';
import Toast from './components/Toast';
import Admin from './components/Admin';
import { useDispatch } from 'react-redux';
import { bindActionCreators } from 'redux';
import { authActionCreators } from './redux/actionCreators';

const AuthRoute = lazy(() => import("./utils/AuthRoute"));
const PrivateRoute = lazy(() => import("./utils/PrivateRoute"));

function App() {
  const [ToastConf, setToastConf] = useState(null);
  const configToast = (message, variant) => {
    setToastConf({
      message: message,
      variant: variant
    });
    setTimeout(() => {
      setToastConf(null);
    }, 4000);
  };
  const closeToast = () => {
    setToastConf(null);
  }

  const dispatch = useDispatch();
  const { setAuthStatus } = bindActionCreators(authActionCreators, dispatch);

  useEffect(() => {
    const authToken = localStorage.getItem('authToken');
    if(authToken){
      setAuthStatus(true, authToken);
    }
  }, []);

  return (
    <>
      <NoteState>
        <Router>
          <Toast toast={ToastConf} closeToast={closeToast}/>
          <Suspense fallback={<div></div>}>
            <Switch>
              <Route exact path="/">
                <Redirect to="/login"/>
              </Route>
              <PrivateRoute path="/admin" component={Admin} configToast={configToast}/>
              <AuthRoute exact path="/login" component={Login} configToast={configToast}/>
              <AuthRoute exact path="/register" component={Register} configToast={configToast}/>
            </Switch>
          </Suspense>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
