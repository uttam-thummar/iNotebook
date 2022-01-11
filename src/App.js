import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
// import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';
import Toast from './components/Toast';

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
          <Navbar configToast={configToast}/>
          <Toast toast={ToastConf} closeToast={closeToast}/>
          {/* <Alert alert={AlertConf}/> */}
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home configToast={configToast}/>
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
              <Route exact path="/login">
                <Login configToast={configToast}/>
              </Route>
              <Route exact path="/register">
                <Register configToast={configToast}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
