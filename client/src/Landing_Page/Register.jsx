import styles from "./Auth.module.css"

function Register(){

    return(
        <div className={styles.auth}>
            <h1>Register</h1>
            <div className={styles.loginBox}>
                <input type="text" placeholder="College Name"/>
                <input type="password" placeholder="Password"/>
                <button className={styles.authButton} >Register</button>
            </div>
        </div>
    )
}

export default Register