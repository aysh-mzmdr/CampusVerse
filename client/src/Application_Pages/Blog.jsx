import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"
import style from "./Blog.module.css"

function Blog(){

    const navigate=useNavigate()

    return(
        <>
            <h1>This is Blog</h1>
            <button className={style.home} onClick={() => navigate("/profilehome")}><img className={style.homeImage} src={home} alt="Home"></img></button>
        </>
    )
}

export default Blog