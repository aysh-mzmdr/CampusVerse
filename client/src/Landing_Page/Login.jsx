import { useState,useEffect } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Login(){

    const [roll,setRoll] = useState("")
    const [password,setPassword] = useState("")
    const [institute,setInstitute] = useState("")
    const [institutions,setInstitutitons]=useState([])

    const navigate=useNavigate()
    const toNewAccounts=() => navigate("/newaccounts")

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
            if(response.status === 200)
                navigate("/profilehome")
            else if(response.status === 301)
                navigate("/verification")
            else if(response.status === 201)
                navigate("/adminhome")
            else if(response.status === 302)
                navigate("/unverifiedadmin")
        }
        catch(err){
            console.log(err)
        }
    }

    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/institutions`,{credentials:"include"})
        .then(response => response.json())
        .then(value => setInstitutitons(value.institutions))
        .catch(err => console.log(err))
    },[])

    return(
        <div className={styles.authNotVerify}>
            <button className={styles.goButton} onClick={toNewAccounts}>New Account? Know your temporary password here</button>
            <h1 className={styles.title}>Login</h1>
            <form className={styles.loginBox} onSubmit={loginHandle}>
                <div className={styles.entry}><label>Roll Number :    </label><input value={roll} type="text" onChange={(e) => setRoll(e.target.value)} required/></div>
                <div className={styles.entry}><label>Institute :      </label><select value={institute} onChange={(e) => setInstitute(e.target.value)} required>
                    <option value="" disabled>Select Institute</option>
                    {institutions.map(institute => (
                        <option key={institute.institute} value={institute.institute}>{institute.institute}</option>
                    ))}
                </select></div>
                <div className={styles.entry}><label>Password :   </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></div>
                <button type="submit" className={styles.authButton}>Login</button>
            </form>
        </div>
    )
}

export default Login