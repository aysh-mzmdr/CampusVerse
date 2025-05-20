import styles from "./Profile.module.css"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function ProfileHome(){

    const navigate=useNavigate()
    const toFriends=() => {navigate("/friends")}
    const toFindFriends=() => {navigate("/findfriends")}
    const toProfile=() => {navigate("/profile")}
    const toGames=() => {navigate("/games")}
    const toHelpSquare=() => {navigate("/helpsquare")}
    const toBlog=() => {navigate("/blog")}

    const [user,setUser]=useState({})

    const logoutHandle=async () => {
        try{
            const response = await fetch(`http://localhost:${SERVER_PORT}/auth/logout`,{method:"POST",credentials:"include"})
            if(response.ok) navigate("/")
        }
        catch(err){
            console.log(err)
        }
        
    }

    useEffect(()=>{
        fetch(`http://localhost:${SERVER_PORT}/api/collect`,{credentials:"include"})
        .then(response => response.json())
        .then(value => setUser(value.user))
        .catch(err => console.log(err))
    },[])

    return(
        <>
            <h1 style={{color:"white",textAlign:"center",fontFamily:"Georgia",fontSize:"4em",fontWeight:"600"}}>Welcome {user.name}!</h1>
            <div className={styles.events}>

            </div>
            <h1 style={{color:"white",textAlign:"center",fontFamily:"Verdana",fontSize:"3.2em",fontWeight:"600"}}>Activity Building</h1>
            <div className={styles.profile_section}>
                <button onClick={toFriends} className={styles.profile_button}>Friends</button>
                <button onClick={toFindFriends} className={styles.profile_button}>Find Friends</button>
                <button onClick={toProfile} className={styles.profile_button}>Profile</button>
                <button onClick={toGames} className={styles.profile_button}>Games</button>
                <button onClick={toHelpSquare} className={styles.profile_button}>HelpSquare</button>
                <button onClick={toBlog} className={styles.profile_button}>Blog</button>
                <button className={styles.logout_button} onClick={logoutHandle}>Logout</button>          
            </div>
            <div className={styles.profile_footers}>

            </div>
        </>
    )
}

export default ProfileHome