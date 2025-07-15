import style from "./Friends.module.css"
import Student from "./FriendCards.jsx"
import { useEffect, useState } from "react"
import { data, useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function FindFriends(){

    const [batchmates,setBatchmates] = useState([])
    const navigate=useNavigate();

    const [search,setSearch] = useState("")
    
    const [pointAura,setPointAura]=useState(1000)
    const [pointInterest,setPointInterest]=useState(50)
    const [pointBranch,setBranch]=useState(50)
    const [pointBatch,setBatch]=useState(50)
    const[user,setUser]=useState("")
    const[userInterest,setUserInterest]=useState([])

    useEffect(()=>{
            fetch(`http://localhost:${SERVER_PORT}/api/collect`,{credentials:"include"})
            .then(response => response.json())
            .then(data => {setUser(data.user);setUserInterest([...data.user.interests])})
            .catch(err => console.log(err))
    },[])

    useEffect(() => {
        const query=async()=>{
            try{
                const response=await fetch(`http://localhost:${SERVER_PORT}/api/batchmates`,{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({search})
                })
                const data=await response.json()
                let friends=[];
                data.map(student => {
                    let score=0;
                    let commonInterest=0;
                    userInterest.forEach(interest => {
                        if(student.interests.includes(interest.name))
                            commonInterest++;
                    })
                    score+=commonInterest*pointInterest;
                    if(user.batch == student.batch)
                        score+=student.batch*pointBatch;
                    else
                        score+=student.batch;
                    if(user.branch == student.branch)
                        score*=pointBranch;
                    score+=student.aura * pointAura;
                    friends.push({student,score:score})
                    friends.sort((a,b) => b.score - a.score)
                })
                console.log(friends)
                setBatchmates(friends)
            }
            catch(e){
                console.log(e)
            }
        }
        query()
    },[search,pointAura,pointInterest,pointBatch,pointBranch])
    
    return(
        <>
            <div className={style.navbar}>
                <label style={{fontSize:"1.2em",display:"flex",alignItems:"center",fontWeight:"600"}}>Search : </label><input className={style.inputBox} value={search} onChange={e => setSearch(e.target.value)} type="text" placeholder="Enter any keyword"></input>
                <div className={style.buttonArea}>
                    <button className={style.function_button} onClick={() => navigate("/requests")}>Requests</button>
                    <button className={style.function_button} onClick={() => navigate("/pending")}>Pending</button>
                    <div className={style.sort}>
                        <label>Recommend by:</label>
                        <div className={style.sortOptions}>
                            <button className={style.sortOption} onClick={(() => {setPointAura(1000);setPointInterest(50);setBatch(50);setBranch(50)})}>Aura</button>
                            <button className={style.sortOption} onClick={(() => {setPointAura(50);setPointInterest(1000);setBatch(50);setBranch(50)})}>Interests</button>
                            <button className={style.sortOption} onClick={(() => {setPointAura(50);setPointInterest(50);setBatch(1000);setBranch(50)})}>Batch</button>
                            <button className={style.sortOption} onClick={(() => {setPointAura(50);setPointInterest(50);setBatch(50);setBranch(10000)})}>Branch</button>
                        </div>
                    </div>
                </div>
            </div>
            <h1 style={{color:"white",textAlign:"center",marginBlockStart:"2em",marginBlockEnd:"1.2em",fontSize:"3em"}}>Find Friends</h1>
            <div className={style.friends}>
                {batchmates.map(student => (
                    <Student key={student.student.id} image={student.student.profile_pic} id={student.student.id} name={student.student.name} branch={student.student.branch} batch={student.student.batch} aura={student.student.aura} interests={student.student.interests}/>
                ))}
            </div> 
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default FindFriends