import React, { useEffect, lazy } from 'react';
import { Switch, Route, useRouteMatch, useHistory } from "react-router-dom";
import Navbar from './Navbar';
import Home from './Home';
import About from './About';
import AddNote from './AddNote';

function Admin() {
    const { path } = useRouteMatch();
    const history = useHistory();

    useEffect(() => {
        if (history.location.pathname === "/admin") {
            history.push("/admin/notes");
        }
    });

    return (
        <>
            <div>
                <Navbar />
                <div className="container">
                    <Switch>
                        <Route exact path={`${path}/notes`} component={Home} />
                        <Route exact path={`${path}/add-note`} component={AddNote} />
                        <Route exact path={`${path}/about`} component={About} />
                    </Switch>
                </div>
            </div>
        </>
    )
}

export default Admin
