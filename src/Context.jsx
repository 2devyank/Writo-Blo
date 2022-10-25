import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, provider } from "./firebase";


const userAuthcontext=createContext();

export function UserAuthContextProvider({children}){
const [user,setuser]=useState("");

    function logout(){
        return signOut(auth);
    }
    function googlesignin(){
        return signInWithPopup(auth,provider);
    }

    useEffect(()=>{
        const unsubscribe=onAuthStateChanged(auth,currentuser=>{
            setuser(currentuser);
            // console.log(currentuser);
            // localStorage.clear();
            localStorage.setItem("Id",currentuser.uid)
            localStorage.setItem("name",currentuser.displayName)
            localStorage.setItem("photo",currentuser.photoURL)
        })
        return()=>{
unsubscribe();
        }
    },[])

    return (
        <userAuthcontext.Provider value={{googlesignin,user}}>
            {children}
        </userAuthcontext.Provider>
    )
}

export function useUserAuth(){
    return useContext(userAuthcontext);
}