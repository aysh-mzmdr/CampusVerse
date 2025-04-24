import { useEffect, useState } from "react";

const SERVER_PORT = import.meta.env.VITE_APP_SERVER_PORT;

function App(){
  const [message,setMessage]=useState("")

  useEffect(()=> {
    fetch(`http://localhost:${SERVER_PORT}/api/message`)
    .then(response => response.json())
    .then(data => setMessage(data.message))
    .catch(err => console.log(err))
  },[])

  return(
    <h1>Hi {message} </h1>
  )
}

export default App;