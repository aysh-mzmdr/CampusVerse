import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import passport from "passport";
import bcrypt,{ genSaltSync } from "bcrypt";
import pool from "../db/database.mjs"
import session from "express-session";
import "./strategies.mjs"

dotenv.config({path:"../.env"})
const CLIENT_PORT=process.env.CLIENT_PORT;
const SERVER_PORT=process.env.SERVER_PORT;
const SECRET_KEY=process.env.SECRET_KEY;

const app=express()

app.use(express.json())
app.use(cors({origin:`http://localhost:${CLIENT_PORT}`,credentials:true}))
app.use(session({
    secret:SECRET_KEY,
    resave:false,
    saveUninitialized:false,
    cookie:{
        secure:false,
        httpOnly:true,
        sameSite:"lax"
    }
}))

app.use(passport.initialize())
app.use(passport.session())

app.post("/auth/login", passport.authenticate("local"),(request,response) => {
    const user=request.user;
    if(user.role==="student"){
        if(user.verified)
            return response.sendStatus(200);
        else if(!user.verified)
            return response.sendStatus(301);
    }
    else if(user.role==="admin"){
        if(user.verified)
            return response.sendStatus(201)
        else if(!user.verified)
            return response.sendStatus(302)
    }
})

app.post("/auth/logout",(request,response) => {
    try{
        if(!request.user) return response.sendStatus(401)
        request.logout((err)=>{
            if(err) return response.sendStatus(400)
            request.session.destroy((err) => {
                if(err) return response.sendStatus(500)
                response.clearCookie("connect.sid")
                return response.sendStatus(200)
            })
        })
    }
    catch(err){
        console.log(err)
    }
})

app.post("/auth/signup",async (request,response) => {
    const {roll,password,institute,role,phone} = request.body
    const salt=genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    if(role==="student"){
        try{
            await pool.query("INSERT INTO temp_pass (id,roll,password,institute) VALUES (DEFAULT,$1,$2,$3) ON CONFLICT(roll,institute) DO NOTHING",[roll,password,institute])
        }    
        catch(err){
            console.log(err)
            return response.sendStatus(500)
        }
    }
    try{
        await pool.query("INSERT INTO users (id,roll,password,institute,role,phone) VALUES (DEFAULT,$1,$2,$3,$4) ON CONFLICT(roll,institute) DO NOTHING",[roll,hashedPassword,institute,role,phone])
        return response.sendStatus(200)
    }    
    catch(err){
        console.log(err)
        return response.sendStatus(500)
    }
})

app.post("/auth/verify",async(request,response)=>{
    const {name,password,branch,batch} = request.body
    const salt=genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    try{
        await pool.query("UPDATE users SET name=$1,password=$2,branch=$3,batch=$4 WHERE id=$5",[name,hashedPassword,branch,batch,request.user.id])
        await pool.query("UPDATE users SET verified=$1 WHERE id=$2",[true,request.user.id])
        return response.sendStatus(200)
    }
    catch(err){
        console.log(err)
        return response.sendStatus(500)
    }
})

app.get("/api/collect",(request,response) =>{
    const user=request.user;
    response.send({user})
})

app.get("/api/institutions",async (request,response) =>{
    const institutionsQuery=await pool.query("SELECT DISTINCT institute FROM users")
    const institutions = institutionsQuery.rows;
    response.send({institutions})
})

app.post("/api/newaccounts",async(request,response)=>{
    const {roll,institute} = request.body;
    try{
        const passwordQuery = await pool.query("SELECT password FROM temp_pass WHERE roll=$1 AND institute=$2",[roll,institute])
        const password=passwordQuery.rows[0].password;
        response.send({password})
    }
    catch(err){
        response.sendStatus(404)
    }

})
app.listen(SERVER_PORT)


