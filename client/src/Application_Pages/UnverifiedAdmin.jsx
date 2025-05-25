import styles from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function UnverifiedAdmin(){

    const navigate=useNavigate()

    const logoutHandle=async () => {
        try{
            const response = await fetch(`http://localhost:${SERVER_PORT}/auth/logout`,{method:"POST",credentials:"include"})
            if(response.ok) navigate("/")
        }
        catch(err){
            console.log(err)
        }
        
    }

    return(
        <div style={{height:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",color:"white"}}>
            <h1 style={{fontSize:"2em"}}>You are not verified yet!!</h1>
            <h3 style={{fontSize:"2em"}}>Out team is currently examining your profile...</h3>
            <button className={styles.logout_button} onClick={logoutHandle}>Logout</button>
        </div> 
    )
}

export default UnverifiedAdmin