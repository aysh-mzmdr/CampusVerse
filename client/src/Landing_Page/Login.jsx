import { useState } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Login(){

    const [roll,setRoll] = useState("")
    const [password,setPassword] = useState("")
    const [institute,setInstitute] = useState("")

    const navigate=useNavigate()

    const loginHandle= async (e) => {
        e.preventDefault()
        try{
            const response=await fetch(`http://localhost:${SERVER_PORT}/auth/login`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({roll,institute,password})
            })
            if(response.ok)
                navigate("/profilehome")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.auth}>
            <h1>Login</h1>
            <form className={styles.loginBox} onSubmit={loginHandle}>
                <label>Roll Number : <input value={roll} type="text" onChange={(e) => setRoll(e.target.value)} placeholder="Roll Number"/></label>
                <label>Institute : <select value={institute} onChange={(e) => setInstitute(e.target.value)} required>
                    <option value="" disabled>Select Institute</option>
                    <option value="BIT Sindri">BIT Sindri</option>
                </select></label>
                <label>Password : <input value={password} type="password" onChange={(e) => setPassword(e.target.value)} placeholder="Password"/></label>
                <button type="submit" className={styles.authButton}>Login</button>
            </form>
        </div>
    )
}

export default Login