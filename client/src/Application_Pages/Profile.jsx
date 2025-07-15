import { useEffect, useState } from "react"
import style from "./Profile.module.css"
import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function Profile(){

    const[user,setUser]=useState("")
    const[userInterest,setUserInterest]=useState([])
    const navigate=useNavigate();

    useEffect(()=>{
            fetch(`http://localhost:${SERVER_PORT}/api/collect`,{credentials:"include"})
            .then(response => response.json())
            .then(data => {setUser(data.user);setUserInterest([...data.user.interests])})
            .catch(err => console.log(err))
    },[])

    return(
        <>
            <div className={style.profile}>
                <div className={style.photos}>
                    <img className={style.coverPhoto} src={user.cover_pic} alt="cover photo"></img>
                    <img className={style.profilePhoto} src={user.profile_pic} alt="profile photo"></img>
                </div>
                <h1 className={style.head}>About</h1>
                <div style={{display:"flex",justifyContent:"center",alignItems:"center"}}>
                    <div className={style.about}>
                        <label>Name   : {user.name}</label> 
                        <label>Aura   : {user.aura}</label> 
                        <label>Batch  : {user.batch}</label>
                        <label>Branch : {user.branch}</label>  
                    </div>
                </div>
                <h1 className={style.head}>Interests</h1>
                <div className={style.interests}>
                    {userInterest.map(interest => (
                        <button className={style.interest} key={interest.id} disabled>{interest.name}</button>
                    ))}
                </div>
                <div className={style.accomplishments}>

                </div>
                <div style={{display:'flex', justifyContent:"flex-end"}}>
                    <button style={{marginInlineEnd:"2.5em",fontSize:"1.5em",width:"100px",height:"40px",marginTop:"1.5em"}} onClick={() => {const userInterestID = userInterest.map(interest => interest.id);const userData={user:user,userInterest:userInterestID};navigate("/editUser",{state:userData})}}>Edit</button>
                </div>
                <div style={{height:"50vh"}}>

                </div>
            </div>
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default Profile