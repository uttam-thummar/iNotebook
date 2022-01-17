import * as React from 'react';
import { BrowserRouter as Router, Switch, Route, useRouteMatch } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import About from './About';

function Main(props) {
    let { path, url } = useRouteMatch();
    return (
        <>
            <Router>
            <div>
                <Navbar configToast={props.configToast} />
                <div className="container">
                    <Switch>
                        <Route exact path="/home">
                            <Home configToast={props.configToast}/>
                        </Route>
                        <Route exact path="/about">
                            <About/>
                        </Route>
                    </Switch>
                </div>
            </div>
            </Router>
        </>
    )
}

export default Main
