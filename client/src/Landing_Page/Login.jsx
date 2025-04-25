import styles from "./Auth.module.css"

function Login(){

    return(
        <div className={styles.auth}>
            <h1>Login</h1>
            <div className={styles.loginBox}>
                <input type="text" placeholder="Username"/>
                <input type="password" placeholder="Password"/>
                <button className={styles.authButton}>Login</button>
            </div>
        </div>
    )
}

export default Login