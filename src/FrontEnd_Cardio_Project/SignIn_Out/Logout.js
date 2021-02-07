import { Redirect, useHistory } from 'react-router-dom';
import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Contexts/UserContext';
export default function Logout() {

    const { user, setUser } = useContext(UserContext);

    //clear Data before signing out
    localStorage.clear();
    setUser("");

    return (
        <Redirect to='/login'>

        </Redirect>
    )

}

















