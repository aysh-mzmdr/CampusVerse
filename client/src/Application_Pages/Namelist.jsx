import { useState,useEffect } from "react"
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png"
import style from "./table.module.css"
import { useNavigate } from "react-router-dom"
import home from "../assets/Home.png"

const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Namelist(){

    const navigate=useNavigate()

    const [students,setStudents] = useState([])
    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/students`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(e => console.log(e))
    })

    function editFunction(student){
        const userData=student
        navigate("/edit",{state:userData})
    }

    async function deleteFunction(id){
        const result=window.confirm("Are you sure you want to delete this account?")
        if(result){
            try{
                const response=await fetch(`http://localhost:${SERVER_PORT}/api/students`,{
                    method:"DELETE",
                    credentials:"include",
                    headers:{
                        "Content-type":"application/json"
                    },
                    body: JSON.stringify({id})
                })
                if(response.ok)
                    window.alert("Account successfully deleted!")
                else
                    throw new Error("ERROR")
            }
            catch(e){
                window.alert(e)
            }
        }
    }

    return(
        <>
            <table>
            <thead>
                <tr>
                    <th>Roll</th>
                    <th>Name</th>
                    <th>Branch</th>
                    <th>Batch</th>
                    <th>Phone</th>
                    <th>Edit User</th>
                    <th>Delete User</th>
                </tr>
            </thead>
            <tbody>
                {students.map(student => (
                <tr key={student.id}>
                    <td>{student.roll}</td>
                    <td>{student.name}</td>
                    <td>{student.branch}</td>
                    <td>{student.batch}</td>
                    <td>{student.phone}</td>
                    <td><button className={style.functionButton} onClick={() => editFunction(student)}><img className={style.buttonImg} style={{filter:"invert(100%)"}}src={Edit}/></button></td>
                    <td><button className={style.functionButton} onClick={() => deleteFunction(student.id)}><img className={style.buttonImg} style={{filter:"hue-rotate(150deg) brightness(2)",width:"40px",height:"auto"}} src={Delete}/></button></td>
                </tr>
                ))}
            </tbody>
            </table>
            <button style={{background: "none",border: "none",cursor:"pointer",position:"fixed",bottom:"0px",right:"0px"}} onClick={() => navigate("/adminhome")}><img style={{width:"200px",height:"auto"}} src={home} alt="Home"></img></button>
        </>
    )
}

export default Namelist