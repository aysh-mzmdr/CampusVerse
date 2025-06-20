import { useState,useEffect } from "react"
import Delete from "../assets/delete.png"
import Edit from "../assets/edit.png"
import style from "./table.module.css"



const SERVER_PORT = import.meta.env.VITE_SERVER_PORT
function Namelist(){

    const [students,setStudents] = useState([])
    useEffect(() => {
        fetch(`http://localhost:${SERVER_PORT}/api/students`,{credentials:"include"})
        .then(response => response.json())
        .then(data => setStudents(data))
        .catch(e => console.log(e))
    },[])


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
                    <td><button><img style={{filter:"invert(100%)"}}src={Edit}/></button></td>
                    <td><button><img style={{filter:"hue-rotate(150deg) brightness(2)",width:"40px",height:"auto"}} src={Delete}/></button></td>
                </tr>
                ))}
            </tbody>
            </table>
        </>
    )
}

export default Namelist