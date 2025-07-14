import { useEffect, useState } from "react"
import styles from "./Auth.module.css"
import { useNavigate } from "react-router-dom"
import defaultProfilePic from "/profile_pics/default_profile_pic.png"
import defaultCoverPic from "/cover_pics/default_cover_pic.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Verification(){
    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const [branch,setBranch] = useState("")
    const [batch,setBatch] = useState("")
    const [phone,setPhone] = useState("")
    const [interests,setInterests] = useState([])
    const [userInterests,setUserInterests] = useState([])
    const [profilePicState,setProfilePicState] = useState(defaultProfilePic)
    const [coverPicState,setCoverPicState] = useState(defaultCoverPic)

    const [count,setCount]=useState(0);

    const navigate=useNavigate()

    const verifyHandle= async(e) => {
        e.preventDefault()
        const formData=new FormData()
        formData.append("profile",profilePicState)
        formData.append("cover",coverPicState)
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
            if(response.ok){
                const response=await fetch(`http://localhost:${SERVER_PORT}/auth/verifyPics`,{
                    method:"POST",
                    credentials:"include",
                    body: formData
                })
                if(response.ok)
                    navigate("/profilehome")
                else
                    throw new Error("Invalid Credentials")
            }
            else
                throw new Error("Invalid Credentials")
        }
        catch(err){
            console.log(err)
        }
    }


    function interestHandle(event){
        if(event.target.checked){
            setCount(count+1);
            setUserInterests(arr => [...arr, event.target.value]);
        }
        else{
            setCount(count-1);
            setUserInterests(arr => arr.filter(interest => interest !== event.target.value));
        }
    }


    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/interests`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setInterests(data))
        .catch(e => console.log(e))
    },[])

    const setProfilePic=()=>{
        const imgFromUser=document.getElementById("profile")
        setProfilePicState(imgFromUser.files[0])
    }

    const setCoverPic=()=>{
        const imgFromUser=document.getElementById("cover")
        setCoverPicState(imgFromUser.files[0])
    }

    return(
        <div className={styles.auth}>
            <h1 className={styles.title}>Complete your Verfication</h1>
            <form className={styles.loginBox} onSubmit={verifyHandle}>
                <div className={styles.formData}>
                    <div className={styles.userData}>
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
                        <div className={styles.entry}><label>New Password :   </label><input value={password} type="password" onChange={(e) => setPassword(e.target.value)} required/></div>
                        <div className={styles.entry}><label>Confirm Password :   </label><input value={confirmPassword} type="password" onChange={(e) => setConfirmPassword(e.target.value)} required/></div>
                    </div>
                    <div className={styles.photoData}>
                        <div className={styles.buttons}>
                            <input type="file" accept="image/png, image/jpeg" id="profile" name="profile" onChange={setProfilePic} hidden/>
                            <input type="file" accept="image/png, image/jpeg" id="cover" name="cover" onChange={setCoverPic} hidden/>
                            <button className={styles.uploadIMG} type="button" onClick={()=>document.getElementById("profile").click()}>Profile photo</button>
                            <button className={styles.uploadIMG} type="button" onClick={()=>document.getElementById("cover").click()}>Cover photo</button>
                        </div>
                        <div className={styles.images}>
                            <img className={styles.coverPic} src={coverPicState instanceof File ? URL.createObjectURL(coverPicState) : coverPicState} id="coverPic"/>
                            <img className={styles.profilePic} src={profilePicState instanceof File ? URL.createObjectURL(profilePicState) : profilePicState} id="profilePic"/>
                        </div>
                    </div>
                </div>
                <label style={{textAlign: "left",fontSize: "1.5em"}}>Interests :</label>
                    <div className={styles.interests}>
                        {interests.map(interest => (
                            <label className={styles.interest} key={interest.id}>
                                <input type="checkbox" value={interest.id} onChange={interestHandle} disabled={count>=20 && !userInterests.includes(interest.id)}/>{interest.name}
                            </label>
                        ))}
                    </div>
                <button type="submit" className={styles.authButton}>Verify</button>
            </form>
        </div>
    )
}

export default Verification