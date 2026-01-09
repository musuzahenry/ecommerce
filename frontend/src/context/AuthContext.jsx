import react, { useState, useEffect, createContext } from 'react'
import { jwtDecode } from 'jwt-decode'
import api from "../api"



export const AuthContext = createContext()


export function AuthProvider({children}){

    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [username, setUsername] = useState("")


    const handleAuth = () =>{
        const token = localStorage.getItem("access")    
        if(token){
            const decoded = jwtDecode(token)
            const expiry_date = decoded.exp
            const current_time = Date.now()/1000
            if(expiry_date >= current_time){
                setIsAuthenticated(true)
            }
        }
    }

    function getUsername(){
       isAuthenticated &&( api.get("get-username").then((res)=>{
            setUsername(res.data.username)
        }).catch((error=>{
            if (error.response && error.response.status === 401) {
                console.log("Sorry, user not yet authenticated")
            }else{
            console.log(error.message)
            }
        })))
    }

    useEffect(function(){
        handleAuth()
        getUsername()
    },[isAuthenticated])






    const authValue = { isAuthenticated, setIsAuthenticated, username, setUsername }

    return (
           <AuthContext.Provider value = { authValue } children = { children } >
               { children }
           </AuthContext.Provider>
        );
}