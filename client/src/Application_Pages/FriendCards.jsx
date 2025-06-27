import { useEffect, useState } from "react"
import style from "./Friendcard.module.css"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function FriendCard(props){

    const [status,setStatus]=useState(false)
    const [isFriend,setFriend]=useState(false)
    const [temp,setTemp]=useState(false)
    const sendFriendRequest=async()=>{

        try{
            const friendID=props.id
            const response=await fetch(`http://localhost:${SERVER_PORT}/send/friendRequest`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({friendID})
            })
            if(!response.ok){
                throw new Error("ERROR")
            }
        }
        catch(e){
            console.log(e)
        }
        setTemp(!temp)
    }

    useEffect(() => {
        const checkStatus=async()=>{
            try{
                const friendID=props.id
                const response=await fetch(`http://localhost:${SERVER_PORT}/api/isFriend`,{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({friendID})
                })
                const data=await response.json()
                setFriend(data.isFriend.accepted)
                setStatus(data.status.exists)
            }
            catch(e){
                console.log(e)
            }
        }   
        checkStatus()
    },[temp])

    return(
        <div className={style.card}>
            <img className={style.cardImage} src={props.image} alt="image"></img>
            <h1 style={{textAlign:"center"}}>{props.name}</h1>
            <h2>Batch  : {props.batch}</h2>
            <h2>Branch : {props.branch}</h2>
            <div className={style.interests}>
                {props.interests.map(interest => {
                    return(
                        <button className={style.interest} key={interest} disabled>{interest}</button>
                    )
                })}
            </div>
            <div className={style.buttonArea}>
                <button className={style.seeProfile}>See Profile</button>
                <button className={style.addFriend} onClick={sendFriendRequest} disabled={status}>{status? (isFriend? "Friends":"Pending"):"Add Friend"}</button>
            </div>
        </div>
    )

}

export default FriendCard