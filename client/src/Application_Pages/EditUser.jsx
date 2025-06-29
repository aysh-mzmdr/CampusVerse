import { useEffect, useState } from "react"
import styles from "../Landing_Page/Auth.module.css"
import { useLocation, useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function EditUser(){

    const navigate=useNavigate()
    const location=useLocation()
    const userData=location.state

    const [count,setCount] = useState(0);
    const [name,setName] = useState(userData.user.name)
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [branch,setBranch] = useState(userData.user.branch)
    const [batch,setBatch] = useState(userData.user.batch)
    const [phone,setPhone] = useState(userData.user.phone)
    const [interests,setInterests] = useState([])
    const [userInterests,setUserInterests] = useState(userData.userInterest)

    useEffect(() => {
        setCount(userInterests.length);
    },[])

    const verifyHandle= async(e) => {
        e.preventDefault()
        try{
            if(password!=confirmPassword) throw new Error("Password and Confirm Password didn't match")
            if(count<5 || count > 20) throw new Error("Not enough interests selected")
            const response=await fetch(`http://localhost:${SERVER_PORT}/auth/verify`,{
                method:"POST",
                credentials:"include",
                headers:{
                    "Content-type":"application/json"
                },
                body: JSON.stringify({name,password,branch,batch,phone,userInterests})
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


    function interestHandle(event){

        const interestID=parseInt(event.target.value)

        if(event.target.checked){
            setCount(count+1);
            setUserInterests(arr => [...arr, interestID]);
        }
        else{
            setCount(count-1);
            setUserInterests(arr => arr.filter(interest => interest !== interestID));
        }
    }


    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/interests`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setInterests(data))
        .catch(e => console.log(e))
    },[])

    return(
        <div className={styles.auth}>
            <h1 className={styles.title}>Edit Profile</h1>
            <form className={styles.loginBox} onSubmit={verifyHandle}>
                <div className={styles.entry}><label>Full Name :    </label><input value={name} type="text" onChange={(e) => setName(e.target.value)}/></div>
                <div className={styles.entry}><label>Branch :      </label><select value={branch} onChange={(e) => setBranch(e.target.value)}>
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
                <div className={styles.entry}><label>Batch :      </label><select value={batch} onChange={(e) => setBatch(e.target.value)}>
                    <option value="" disabled>Select Batch</option>
                    {Array.from({length: new Date().getFullYear() - 2020 +1},(_,i)=>{
                        const year=2020+i;
                        return(
                            <option key={year} value={year}>{year}</option>
                        )
                    })}
                </select></div>
                <div className={styles.entry}><label>Phone No. :    </label><input value={phone} type="number" onChange={(e) => setPhone(e.target.value)}/></div>
                <div className={styles.entry}><label>New Password :   </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></div>
                <div className={styles.entry}><label>Confirm Password :   </label><input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
                <label style={{textAlign: "left",fontSize: "1.5em"}}>Interests :</label>
                    <div className={styles.interests}>
                        {interests.map(interest => (
                            <label className={styles.interest} key={interest.id}>
                                <input type="checkbox" value={interest.id} checked={userInterests.includes(interest.id)} onChange={interestHandle} disabled={count>=20 && !userInterests.includes(interest.id)}/>{interest.name}
                            </label>
                        ))}
                    </div>
                <button type="submit" className={styles.authButton}>Submit</button>
            </form>
            <button className={styles.home} onClick={() => navigate("/profilehome")}><img className={styles.homeImage} src={home} alt="Home"></img></button>
        </div>
    )
}

export default EditUser