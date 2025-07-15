import { useEffect, useState } from "react"
import style from "./Profile.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function FriendProfile(){

    const[user,setUser]=useState("")
    const[userInterest,setUserInterest]=useState([])
    const navigate=useNavigate();
    const location=useLocation()
    const userData=location.state
    useEffect(() => {
        const friendData=async()=>{
            try{
                const friendID=userData.friendID
                const response=await fetch(`http://localhost:${SERVER_PORT}/api/friendcollect`,{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({friendID})
                })
                const data=await response.json()
                if(response.ok){
                    setUser(data.friend)
                    setUserInterest([...data.friend.interests])
                }
                else
                    throw new Error("ERROR")
            }
            catch(e){
                console.log(e)
            }
        }
        friendData()
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
                <div style={{height:"50vh"}}>

                </div>
            </div>
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default FriendProfile