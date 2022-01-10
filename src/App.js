import React, { useState } from 'react';
import './App.css';
import {BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NoteState';
import Alert from './components/Alert';
import Login from './components/Login';
import Register from './components/Register';

function App() {
  const [AlertConf, setAlertConf] = useState(null);
  const configAlert = (message, variant) => {
    setAlertConf({
      message: message,
      variant: variant
    });
    setTimeout(() => {
      setAlertConf(null);
    }, 2000);
  };

  return (
    <>
      <NoteState>
        <Router>
          <Navbar/>
          <Alert alert={AlertConf}/>
          <div className="container">
            <Switch>
              <Route exact path="/">
                <Home configAlert={configAlert}/>
              </Route>
              <Route exact path="/about">
                <About/>
              </Route>
              <Route exact path="/login">
                <Login configAlert={configAlert}/>
              </Route>
              <Route exact path="/register">
                <Register configAlert={configAlert}/>
              </Route>
            </Switch>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
