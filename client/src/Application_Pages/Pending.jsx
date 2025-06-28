import style from "./Friends.module.css"
import Student from "./FriendCards.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function Pending(){

    const [friends,setFriends] = useState([])
    const navigate=useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/pendingFriendsSent`,{credentials:"include"}) 
        .then(response => response.json())
        .then(data => {setFriends(data);console.log(data)})
        .catch(e => console.log(e))
    },[])

    return(
        <>
            <div className={style.navbar}>
                <label style={{fontSize:"1.2em",display:"flex",alignItems:"center",fontWeight:"600"}}>Search : </label><input className={style.inputBox} type="text" placeholder="Enter any keyword"></input>
                <div className={style.buttonArea}>
                    <button className={style.function_button} onClick={() => navigate("/requests")}>Requests</button>
                    <button className={style.function_button} onClick={() => navigate("/pending")}>Pending</button>
                    <div className={style.sort}>
                        <label>Sort by:</label>
                        <div className={style.sortOptions}>
                            <button className={style.sortOption}>Aura</button>
                            <button className={style.sortOption}>Interests</button>
                            <button className={style.sortOption}>Batch</button>
                            <button className={style.sortOption}>Branch</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{color:"white",textAlign:"center",marginBlockStart:"2em",marginBlockEnd:"1.2em",fontSize:"3em"}}>Pending Requests</h1>
            <div className={style.friends}>
                {friends.map(student => (
                    <Student key={student.id} id={student.id} name={student.name} branch={student.branch} batch={student.batch} interests={student.interests}/>
                ))}
            </div> 
        </>
    )
}

export default Pending