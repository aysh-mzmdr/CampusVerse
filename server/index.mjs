import express from "express"
import cors from "cors"
import dotenv from "dotenv"

dotenv.config({path:"../.env"})
const CLIENT_PORT=process.env.CLIENT_PORT;
const SERVER_PORT=process.env.SERVER_PORT;

const app=express()

app.use(express.json())
app.use(cors({origin:`http://localhost:${CLIENT_PORT}`}))

app.get("/api/message",(request,response)=> {
    response.json({message:"Pramod Singh"})
})

app.listen(SERVER_PORT)


