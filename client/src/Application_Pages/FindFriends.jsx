import style from "./friends.module.css"
import Student from "./FriendCards.jsx"
import { useEffect, useState } from "react"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function FindFriends(){

    const [batchmates,setBatchmates] = useState([])

    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/batchmates`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setBatchmates(data))
        .catch(e => console.log(e))
    },[])
    return(
        <>
            <div className={style.friends}>
                {batchmates.map(student => (
                    <Student key={student.id} id={student.id }name={student.name} branch={student.branch} batch={student.batch} interests={student.interests}/>
                ))}
            </div> 
        </>
    )
}

export default FindFriends