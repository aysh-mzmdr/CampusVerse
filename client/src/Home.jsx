import styles from "./Home.module.css"

function Home(){

    return(
        <>
            <div className={styles.navbar}>
                <button>Login</button>
                <button>About Us</button>
                <button>Register</button>
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
        </>
    )
}

export default Home