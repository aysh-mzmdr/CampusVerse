import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"
import style from "./HelpSquare.module.css"

function Messenger(){

    const navigate=useNavigate()
    
    return(
        <>
            <h1>Hello there</h1>
            <button className={style.home} onClick={() => navigate("/adminhome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default Messenger