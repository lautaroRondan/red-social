import React, { createContext, useState, useEffect } from 'react'
import { Global } from '../helpers/Global';
import { PetitionFetchToken } from '../helpers/PetitionFetch';

const AuthContext = createContext();

export const AuthProvider = ({children}) => {

    const [auth, setAuth ] = useState({});
    const [counters, setCounters ] = useState({});

    useEffect(() => {
        authUser();
        
    },[]);

    const authUser = async() => {

        const token = localStorage.getItem("token");
        const user = localStorage.getItem("user");

        if(!token || !user){
            console.log("a")
            return false;
        }

        const userObj = JSON.parse(user);
        const userId = userObj.id;

        const {datos} = await PetitionFetchToken(Global.url + "user/profile/"+userId, "GET", token);
        setAuth(datos.user);
        
        const dato = await PetitionFetchToken(Global.url + "user/counters/"+userId, "GET", token);
        setCounters(dato.datos);
       
    }


  return (
    <AuthContext.Provider
        value={{
            auth,
            setAuth,
            counters,
            setCounters
        }}
        >
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext;