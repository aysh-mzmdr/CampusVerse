import style from "./Friends.module.css"
import Student from "./FriendCards.jsx"
import { useEffect, useState } from "react"
import { data, useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function FindFriends(){

    const [batchmates,setBatchmates] = useState([])
    const navigate=useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/batchmates`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setBatchmates(data))
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
            <h1 style={{color:"white",textAlign:"center",marginBlockStart:"2em",marginBlockEnd:"1.2em",fontSize:"3em"}}>Find Friends</h1>
            <div className={style.friends}>
                {batchmates.map(student => (
                    <Student key={student.id} image={student.profile_pic} id={student.id} name={student.name} branch={student.branch} batch={student.batch} interests={student.interests}/>
                ))}
            </div> 
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default FindFriends