import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom"
import { useState,useEffect } from "react"
import EventCard from "./EventCard.jsx"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function AdminHome(){

    const navigate=useNavigate()
    const toCreateProfiles=() => {navigate("/createprofiles")}
    const toNamelist=() => {navigate("/namelist")}
    const toEvents=() => {navigate("/events")}
    const toMessenger=() => {navigate("/messenger")}

    const logoutHandle=async () => {
        try{
            const response = await fetch(`http://localhost:${SERVER_PORT}/auth/logout`,{method:"POST",credentials:"include"})
            if(response.ok) navigate("/")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <>
            <h1 style={{color:"white",textAlign:"center",fontFamily:"Georgia",fontSize:"4em",fontWeight:"600"}}>Welcome Admin!</h1>
            <h1 style={{color:"white",textAlign:"center",fontFamily:"Verdana",fontSize:"3.2em",fontWeight:"600"}}>Events</h1>
            <div className={styles.events}>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
                <EventCard info="Inter House Volleyball tournament" date="25th July"/>
            </div>
            <h1 style={{color:"white",textAlign:"center",fontFamily:"Verdana",fontSize:"3.2em",fontWeight:"600"}}>Activity Building</h1>
            <div className={styles.profile_section}>
                <button onClick={toCreateProfiles} className={styles.profile_button}>Create Profiles</button>
                <button onClick={toNamelist} className={styles.profile_button}>Namelist</button>
                <button onClick={toEvents} className={styles.profile_button}>Events</button>
                <button onClick={toMessenger} className={styles.profile_button}>Messenger</button>
                <button className={styles.logout_button} onClick={logoutHandle}>Logout</button>          
            </div>
        </>
    )
}

export default AdminHome