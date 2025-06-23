import { useState,useEffect } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function NewAccounts(){

    const [roll,setRoll] = useState("")
    const [password,setPassword] = useState("")
    const [institute,setInstitute] = useState("")
    const [institutions,setInstitutitons]=useState([])

    const navigate=useNavigate()
    const toLogin=() => navigate("/login")
    const newAccountsHandle= async (e) => {
        e.preventDefault()
        try{
            const response=await fetch(`http://localhost:${SERVER_PORT}/api/newaccounts`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({roll,institute})
            })
            if(response.status===404)
                setPassword("--")
            else{
                const data=await response.json();
                setPassword(data.password)
            }
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
            <button className={styles.goButton} onClick={toLogin}>Go Back</button>
            <h1 className={styles.title}>New Accounts</h1>
            <form className={styles.loginBox} onSubmit={newAccountsHandle}>
                <div className={styles.entry}><label>Roll Number :    </label><input value={roll} type="text" onChange={(e) => setRoll(e.target.value)} required/></div>
                <div className={styles.entry}><label>Institute :      </label><select value={institute} onChange={(e) => setInstitute(e.target.value)} required>
                    <option value="" disabled>Select Institute</option>
                    {institutions.map(institute => (
                        <option key={institute.institute} value={institute.institute}>{institute.institute}</option>
                    ))}
                </select></div>
                <div className={styles.entry}><label>Password :   </label><input value={password} disabled/></div>
                <button type="submit" className={styles.authButton}>Get Password</button>
            </form>
        </div>
    )
}

export default NewAccounts