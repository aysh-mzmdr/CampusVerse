// THIS IS DEMO CODE!!!!!

import { useState } from "react"
import styles from "./Profile.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function CreateProfiles(){
    const [roll,setRoll] = useState("")
    const [password,setPassword] = useState("")
    const [institute,setInstitute] = useState("")
    const role="admin";
    const navigate=useNavigate()

    const signupHandle= async(e) => {
        e.preventDefault()
        try{
            const response=await fetch(`http://localhost:${SERVER_PORT}/auth/signup`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({roll,password,institute,role})
            })
            if(response.ok)
                navigate("/")
            else
                throw new Error("Invalid Credentials")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.auth}>
            <h1 className={styles.title}>Register</h1>
            <form className={styles.loginBox} onSubmit={signupHandle}>
                <div className={styles.entry}><label>Roll Number :    </label><input value={roll} type="text" onChange={(e) => setRoll(e.target.value)} required/></div>
                <div className={styles.entry}><label>Designation :    </label><input type="text" required/></div>
                <div className={styles.entry}><label>Institute :      </label><input value={institute} type="text" onChange={(e) => setInstitute(e.target.value)} required/></div>
                <div className={styles.entry}><label>Password :   </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></div>
                <button type="submit" className={styles.authButton}>Register</button>
            </form>
        </div>
    )
}

export default CreateProfiles