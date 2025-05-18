import styles from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT

function ProfileHome(){

    const navigate=useNavigate()
    const toFriends=() => {navigate("/friends")}
    const toFindFriends=() => {navigate("/findfriends")}
    const toProfile=() => {navigate("/profile")}
    const toGames=() => {navigate("/games")}
    const toHelpSquare=() => {navigate("/helpsquare")}
    const toBlog=() => {navigate("/blog")}

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
        <>
            <h1>Welcome</h1>
            <div className={styles.events}>

            </div>
            <div className={styles.profile_section}>
                <button onClick={toFriends} className={styles.profile_button}>Friends</button>
                <button onClick={toFindFriends} className={styles.profile_button}>Find Friends</button>
                <button onClick={toProfile} className={styles.profile_button}>Profile</button>
                <button onClick={toGames} className={styles.profile_button}>Games</button>
                <button onClick={toHelpSquare} className={styles.profile_button}>HelpSquare</button>
                <button onClick={toBlog} className={styles.profile_button}>Blog</button>
                <button className={styles.profile_button} onClick={logoutHandle}>Logout</button>          
            </div>
            <div className={styles.profile_footers}>

            </div>
        </>
    )
}

export default ProfileHome