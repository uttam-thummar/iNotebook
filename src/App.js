import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route, Redirect} from "react-router-dom";
import NoteState from './context/notes/NoteState';
import Login from './components/Login';
import Register from './components/Register';
import Toast from './components/Toast';
import Main from './components/Main';

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

  return (
    <>
      <NoteState>
        <Router>
          <Toast toast={ToastConf} closeToast={closeToast}/>
          <Switch>
            <Route exact path="/">
              <Redirect to="/login"/>
            </Route>
            <Route exact path="/login">
              <Login configToast={configToast}/>
            </Route>
            <Route exact path="/register">
              <Register configToast={configToast}/>
            </Route>
            <Route exact path="/home">
              <Main configToast={configToast}/>
            </Route>
          </Switch>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
