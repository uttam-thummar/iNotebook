import React, { useEffect, lazy } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import AddNote from './AddNote';

function Admin(props) {
    const { path, url } = useRouteMatch();
    const history = useHistory();
    useEffect(() => {
        if (history.location.pathname === "/admin") {
            history.push("/admin/notes");
        }
    }, []);
    return (
        <>
            <div>
                <Navbar configToast={props.configToast} />
                <div className="container">
                    <Switch>
                        <Route exact path={`${path}/notes`}>
                            <Home configToast={props.configToast} />
                        </Route>
                        <Route exact path={`${path}/add-note`}>
                            <AddNote configToast={props.configToast} />
                        </Route>
                        <Route exact path={`${path}/about`}>
                            <About />
                        </Route>
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Admin
