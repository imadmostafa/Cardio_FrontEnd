import {
    BrowserRouter as Router,
    Switch as RouterSwitch,
    Route
} from 'react-router-dom';
import React from 'react';
import { useState } from 'react';
import { UserContext } from '../Contexts/UserContext';

//needed components
import SignIn from '../SignIn_Out/SignIn';
import Logout from '../SignIn_Out/Logout';
import ListPatients from '../Components/ListPatients';
import Main_AppBar from '../Components/AppBar';



export default function MainRouter() {
    var isloggedin = localStorage.getItem('isloggedin');
    const [user, setUser] = useState(isloggedin);

    return (

        <UserContext.Provider value={{ user, setUser }}>
            <Router >

                <RouterSwitch>
                <Route exact path="/listpatients">
                        <Main_AppBar />

                    </Route>
                    <Route exact path="/">
                    <Main_AppBar />
                    </Route>
                    
                    
                    <Route exact path="/login">
                        <SignIn></SignIn>
                    </Route>
                    <Route exact path="/logout">
                        <Logout></Logout>
                    </Route>

                </RouterSwitch>

            </Router>

        </UserContext.Provider>

    )

}
