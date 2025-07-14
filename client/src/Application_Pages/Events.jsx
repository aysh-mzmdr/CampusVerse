import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

function Events(){

    const navigate=useNavigate()
    return(
        <>
            <h1>Hello there</h1>
            <button style={{background: "none",border: "none",cursor:"pointer",position:"fixed",bottom:"0px",right:"0px"}} onClick={() => navigate("/adminhome")}><img style={{width:"200px",height:"auto"}} src={home} alt="Home"></img></button>
        </>
    )
}

export default Events