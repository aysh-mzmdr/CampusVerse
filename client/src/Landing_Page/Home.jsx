import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom";

function Home(){

    const navigate=useNavigate()
    const toLogin = () => {navigate("/login")}
    const toRegister = () => {navigate("/register")}
    return(
        <div className={styles.home}>
            <div className={styles.navbar}>
                <button className={styles.navButton} onClick={toLogin}>Login</button>
                <button className={styles.navButton}>About Us</button>
                <button className={styles.navButton} onClick={toRegister}>Register</button>
            </div>
            <div className={styles.head}>
                <h1>CampusVerse</h1>
                <h5>Connecting You with Your people</h5>
            </div>
            <div className={styles.about}>
                <h1>What we offer</h1>
                <div className={styles.offers}>

                </div>
            </div>
            <div className={styles.footer}>
                <h1>idk</h1>
            </div>
        </div>
    )
}

export default Home