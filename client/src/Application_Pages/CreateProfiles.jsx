import { useState,useEffect } from "react"
import styles from "../Landing_Page/Auth.module.css"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function CreateProfiles(){
    const [start,setStart] = useState("")
    const [end,setEnd] = useState("")
    const [institute,setInstitute] = useState("")
    const [progress,setProgress]=useState("")

    const role="student";

    const createHandle= async(e) => {
        e.preventDefault()

        const requests=[]

        for(let i=start;i<=end;i++){

            const roll=i;
            const password=genPassword()

            try{
                const request=await fetch(`http://localhost:${SERVER_PORT}/auth/signup`,{
                    method:"POST",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({roll,password,institute,role})
                })
                setProgress(`${i} of ${end} users done........`)
                requests.push(request);
            }
            catch(err){
                console.log(err)
            }
        }

        const response=await Promise.all(requests)
        setProgress(`Successfully created ${end-start+1} users!`)
        const status=response.every(response => response.ok)

        if(status){
            setStart("")
            setEnd("")
        }
        else
            console.log("Some error occured!")
    }

    useEffect(()=>{
        fetch(`http://localhost:${SERVER_PORT}/api/collect`,{credentials:"include"})
        .then(response => response.json())
        .then(value => setInstitute(value.user.institute))
        .catch(err => console.log(err))
    },[])



    const genPassword = () => {
        const char="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890!@#$%^&*"
        let tempPass = "";
        for(let i=0;i<10;i++){
            tempPass=tempPass+char[Math.floor(Math.random()*char.length)]
        }
        return tempPass;
    }

    return(
        <div className={styles.authNotVerify}>
            <h1 className={styles.progress}>{progress}</h1>
            <h1 className={styles.title}>Create Profiles</h1>
            <form className={styles.loginBox} onSubmit={createHandle}>
                <div className={styles.entry}><label>First Roll Number :    </label><input value={start} type="text" onChange={(e) => setStart(e.target.value)} required/></div>
                <div className={styles.entry}><label>Last Roll Number :    </label><input value={end} type="text" onChange={(e) => setEnd(e.target.value)} required/></div>
                <button type="submit" className={styles.authButton}>Create Profiles</button>
            </form>
        </div>
    )
}

export default CreateProfiles