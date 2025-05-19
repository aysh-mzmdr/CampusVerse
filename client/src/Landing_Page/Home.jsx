import styles from "./Home.module.css"
import { useNavigate } from "react-router-dom";
import Card from "./Card.jsx"
import Aura from "../assets/Aura.png"
import Friend from "../assets/Friend.png"
import News from "../assets/News.png"
import Microblog from "../assets/Microblog.png"
import Help from "../assets/Help.png"
import Game from "../assets/Game.png"
import { useRef } from "react";

function Home(){
    const aboutRef = useRef()
    const navigate=useNavigate()
    const toLogin = () => {navigate("/login")}
    const toRegister = () => {navigate("/register")}

    const toAbout=()=>{
        aboutRef.current?.scrollIntoView({behavior:"smooth"})
    }

    return(
        <div className={styles.home}>
            <div className={styles.navbar}>
                <button className={styles.navButton} onClick={toLogin}>Login</button>
                <button className={styles.navButton} onClick={toAbout}>About Us</button>
                <button className={styles.navButton} onClick={toRegister}>Register</button>
            </div>
            <div className={styles.head}>
                <h1>CampusVerse</h1>
                <h5>Connecting You with Your people</h5>
            </div>
            <div ref={aboutRef} className={styles.about}>
                <h1 className={styles.whatweoffer}>What we offer</h1>
                <div className={styles.offers}>
                    <Card image={Friend} info="A place where students can connect with others of their own institute who share their interests "/>
                    <Card image={Game} info="A place to play and compete with your colleagues for the leaderboards"/>
                    <Card image={Help} info="A place for students to find someone who could help them to solve their problem"/>
                    <Card image={News} info="A place where students can stay updated with campus events, announcements, and activities, reducing reliance on scattered sources of information."/>
                    <Card image={Aura} info="A place where students are known for their goodness"/>
                    <Card image={Microblog} info="A place where students of an institution can share thoughts, updates, and opinion"/>
                </div>
            </div>
            <div className={styles.footer}>
                <p style={{fontFamily:"monospace",fontSize:"1.5em"}}>Created by aysh_mzmdr</p>
            </div>
        </div>
    )
}

export default Home