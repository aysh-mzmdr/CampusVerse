import { useState } from "react"
import styles from "../Landing_Page/Auth.module.css"
import { useNavigate,useLocation } from "react-router-dom"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Edit(){
    const location=useLocation()
    const userData=location.state;
    const [name,setName] = useState(userData.name)
    const [branch,setBranch] = useState(userData.branch)
    const [batch,setBatch] = useState(userData.batch)
    const [phone,setPhone] = useState(userData.phone)
    const id=userData.id;
    
    const navigate=useNavigate()

    const editHandle= async(e) => {
        e.preventDefault()
        try{
            const response=await fetch(`http://localhost:${SERVER_PORT}/auth/edit`,{
                method:"PATCH",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({id,name,branch,batch,phone})
            })
            if(response.ok){
                window.alert("Account edited successfully!")
                navigate("/namelist")
            }
            else
                throw new Error("ERROR")
        }
        catch(err){
            console.log(err)
        }
    }

    return(
        <div className={styles.auth}>
            <h1 className={styles.title}>Edit</h1>
            <form className={styles.loginBox} onSubmit={editHandle}>
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
                <div className={styles.entry}><label>Phone No. :    </label><input value={phone} type="number" onChange={(e) => setPhone(e.target.value)} required/></div>
                <button type="submit" className={styles.authButton}>Submit</button>
            </form>
        </div>
    )
}

export default Edit