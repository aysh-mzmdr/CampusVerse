import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"
import style from "./HelpSquare.module.css"

function HelpSquare(){

    const navigate=useNavigate()
    
    return(
        <>
            <h1>This is HelpSquare</h1>
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default HelpSquare