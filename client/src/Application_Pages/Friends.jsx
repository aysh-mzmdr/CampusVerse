import style from "./Friends.module.css"
import Student from "./FriendCards.jsx"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function Friends(){

    const [friends,setFriends] = useState([])
    const navigate=useNavigate();

    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/friends`,{credentials:"include"}) 
        .then(response => response.json())
        .then(data => {setFriends(data);console.log(data)})
        .catch(e => console.log(e))
    },[])

    return(
        <>

            <div className={style.navbar}>
                <label>Search : </label><input type="text" placeholder="Enter any keyword"></input>
                <button onClick={() => navigate("/requests")}>Requests</button>
                <button onClick={() => navigate("/pending")}>Pending</button>
                <div className={style.hamburger}>
                    <button>Aura</button>
                    <button>Interests</button>
                    <button>Batch</button>
                    <button>Branch</button>
                </div>
            </div>

            <div className={style.friends}>
                {friends.map(student => (
                    <Student key={student.id} id={student.id }name={student.name} branch={student.branch} batch={student.batch} interests={student.interests}/>
                ))}
            </div> 
        </>
    )
}

export default Friends