import { useState } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Verification(){
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [branch,setBranch] = useState("")
    const [batch,setBatch] = useState("")

    const navigate=useNavigate()

    const verifyHandle= async(e) => {
        e.preventDefault()
        try{
            if(password!=confirmPassword) throw new Error("Password and Confirm Password didn't match")
            const response=await fetch(`http://localhost:${SERVER_PORT}/auth/verify`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({name,password,branch,batch})
            })
            if(response.ok)
                navigate("/profilehome")
            else
                throw new Error("Invalid Credentials")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.auth}>
            <h1 className={styles.title}>Complete your Verfication</h1>
            <form className={styles.loginBox} onSubmit={verifyHandle}>
                <div className={styles.entry}><label>Full Name :    </label><input value={name} type="text" onChange={(e) => setName(e.target.value)} required/></div>
                <div className={styles.entry}><label>Branch :      </label><select value={branch} onChange={(e) => setBranch(e.target.value)} required>
                    <option value="" disabled>Select Branch</option>
                    <option value="Computer Science">Computer Science</option>
                    <option value="Cyber Security">Computer Science</option>
                    <option value="Information Technology">Information Technology</option>
                    <option value="Electrical">Electrical</option>
                    <option value="Electronics and Communication">Electronics and Communication</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Mining">Mining</option>
                    <option value="Civil">Civil</option>
                    <option value="Chemical">Chemical</option>
                    <option value="Metallurgy">Metallurgy</option>
                    <option value="Production and Industrial">Production and Industrial</option>
                </select></div>
                <div className={styles.entry}><label>Batch :      </label><select value={batch} onChange={(e) => setBatch(e.target.value)} required>
                    <option value="" disabled>Select Batch</option>
                    {Array.from({length: new Date().getFullYear() - 2020 +1},(_,i)=>{
                        const year=2020+i;
                        return(
                            <option key={year} value={year}>{year}</option>
                        )
                    })}
                </select></div>
                <div className={styles.entry}><label>New Password :   </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></div>
                <div className={styles.entry}><label>Confirm Password :   </label><input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
                <button type="submit" className={styles.authButton}>Verify</button>
            </form>
        </div>
    )
}

export default Verification