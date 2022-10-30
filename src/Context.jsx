import { onAuthStateChanged, signInWithPopup, signOut } from "firebase/auth";
import { collection, getDocs } from "firebase/firestore";
import { createContext, useContext, useEffect, useState } from "react";
import { auth, db, provider } from "./firebase";


const userAuthcontext=createContext();

export function UserAuthContextProvider({children}){
const [user,setuser]=useState("");
// const [like,setlike]=useState(0);

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
    const [postdata,setpostdata]=useState([]);
  useEffect(()=>{
    const fetchdata=async()=>{
      let list=[];
      try{
        const querysnapshot=await getDocs(collection(db,"posts"))
        querysnapshot.forEach((doc)=>{
          list.push({...doc.data()})
          setpostdata(list);
        })
      }catch(err){
        console.log(err)
      }
     
    }
    fetchdata();
  },[])
  const [search,setsearch]=useState("");
  const handlesearch=()=>{
    return postdata.filter((post)=>

    post.title.toLowerCase().includes(search)
    ||
    post.name.toLowerCase().includes(search)
    )
  }
    return (
        <userAuthcontext.Provider value={{googlesignin,user,logout,postdata,setsearch,search,handlesearch}}>
            {children}
        </userAuthcontext.Provider>
    )
}

export function useUserAuth(){
    return useContext(userAuthcontext);
}