import express, { response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import passport from "passport";
import bcrypt,{ genSaltSync } from "bcrypt";
import pool from "../db/database.mjs"
import session from "express-session";
import "./strategies.mjs"
import multer from "multer"
import path from "path"

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
    const {roll,password,institute,role} = request.body
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
        await pool.query("INSERT INTO users (id,roll,password,institute,role) VALUES (DEFAULT,$1,$2,$3,$4) ON CONFLICT(roll,institute) DO NOTHING",[roll,hashedPassword,institute,role])
        return response.sendStatus(200)
    }    
    catch(err){
        console.log(err)
        return response.sendStatus(500)
    }
})

app.post("/auth/verify",async(request,response)=>{
    const {name,password,branch,batch,phone,userInterests,profilePicState,coverPicState} = request.body
    const salt=genSaltSync(10)
    const hashedPassword=bcrypt.hashSync(password,salt)
    try{
        await pool.query("UPDATE users SET name=$1,password=$2,branch=$3,batch=$4,phone=$5 WHERE id=$6",[name,hashedPassword,branch,batch,phone,request.user.id])
        await pool.query("UPDATE users SET verified=$1 WHERE id=$2",[true,request.user.id])
        for(const interestID of userInterests)
            await pool.query("INSERT INTO user_interest_table VALUES($1,$2)",[request.user.id,interestID])
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

app.get("/api/students",async(request,response)=>{
    const institute=request.user.institute;
    const students=await pool.query("SELECT * FROM users WHERE institute=$1 AND ROLL!=0",[institute])
    response.json(students.rows)
})

app.delete("/api/students",async(request,response)=> {
    const {id} = request.body
    try{
        await pool.query("DELETE FROM users WHERE id=$1",[id])
        return response.sendStatus(200)
    }
    catch(e){
        console.log(e)
        return response.sendStatus(500)
    }
})


app.patch("/auth/edit",async(request,response)=>{
    const {id,name,branch,batch,phone} = request.body
    try{
        await pool.query("UPDATE users SET name=$1,branch=$2,batch=$3,phone=$4 WHERE id=$5",[name,branch,batch,phone,id])
        await pool.query("UPDATE users SET verified=$1 WHERE id=$2",[true,request.user.id])
        return response.sendStatus(200)
    }
    catch(err){
        console.log(err)
        return response.sendStatus(500)
    }
})

app.get("/api/interests",async(request,response)=> {
    const interestsQuery=await pool.query("SELECT * FROM interests")
    response.json(interestsQuery.rows)
})

app.get("/api/collectInterest",async(request,response)=> {
    const interestQuery=await pool.query("SELECT * FROM interests JOIN user_interest_table ON interests.id=user_interest_table.interest_id WHERE user_interest_table.user_id=$1",[request.user.id])
    response.json(interestQuery.rows)
})

app.get("/api/batchmates",async(request,response)=>{
    const batchmatesQuery=await pool.query("SELECT users.id AS users_id,users.name AS users_name,users.batch,users.branch,users.profile_pic,users.cover_pic,interests.id AS interest_id,interests.name AS interest_name FROM users LEFT JOIN user_interest_table ON users.id=user_interest_table.user_id LEFT JOIN interests ON interests.id = user_interest_table.interest_id WHERE users.institute=$1 AND users.id NOT IN ($2,$3) AND users.name!='' AND users.id NOT IN ( SELECT sender_id FROM friends UNION SELECT receiver_id FROM friends)",[request.user.institute,request.user.id,0])
    const batchmatesmap={}
    for(const row of batchmatesQuery.rows){
        const {
            users_id,users_name,batch,branch,profile_pic,cover_pic,interest_id,interest_name
        }=row

        if(!batchmatesmap[users_id]){
            batchmatesmap[users_id]={id:users_id,name:users_name,branch,batch,profile_pic,cover_pic,interests:[]}
        }
        if(interest_id && interest_name){
            batchmatesmap[users_id].interests.push(interest_name)
        }
    }
    const batchmates=Object.values(batchmatesmap);          // Removes the keys from the map, keeps only the values
    response.json(batchmates)
})

app.post("/send/friendRequest",async(request,response)=>{
    const userID=request.user.id
    const {friendID}=request.body
    try{
        await pool.query("INSERT INTO friends VALUES ($1,$2,$3)",[userID,friendID,false])
        return response.sendStatus(200)
    }
    catch(e){
        return response.sendStatus(500)
    }
})

app.post("/api/isFriend",async(request,response)=>{
    const {friendID}=request.body
    const userID=request.user.id
    const status=await pool.query("SELECT EXISTS( SELECT 1 FROM friends WHERE (sender_id,receiver_id)=($1,$2) OR (sender_id,receiver_id)=($2,$1))",[userID,friendID])
    let isFriend=false;
    let isRequest=false;
    if(status.rows[0]){
        const isFriendQuery=await pool.query("SELECT accepted FROM friends WHERE (sender_id,receiver_id)=($1,$2) OR (sender_id,receiver_id)=($2,$1)",[userID,friendID])
        const requestQuery=await pool.query("SELECT EXISTS( SELECT 1 FROM friends WHERE sender_id=$1 AND receiver_id=$2 AND accepted=false)",[friendID,userID])
        isFriend=isFriendQuery.rows[0]
        isRequest=requestQuery.rows[0]
    }
    response.json({status:status.rows[0],isFriend:isFriend,isRequest:isRequest})
})

app.get("/api/friends",async(request,response)=>{
    const batchmatesQuery=await pool.query("SELECT users.id AS users_id,users.name AS users_name,users.batch,users.branch,users.profile_pic,users.cover_pic,interests.id AS interest_id,interests.name AS interest_name FROM users LEFT JOIN user_interest_table ON users.id=user_interest_table.user_id LEFT JOIN interests ON interests.id = user_interest_table.interest_id LEFT JOIN friends ON users.id=friends.sender_id WHERE (friends.receiver_id=$1 OR friends.sender_id=$1) AND friends.accepted=$2",[request.user.id,true])
    const batchmatesmap={}
    for(const row of batchmatesQuery.rows){
        const {
            users_id,users_name,batch,branch,profile_pic,cover_pic,interest_id,interest_name
        }=row

        if(!batchmatesmap[users_id]){
            batchmatesmap[users_id]={id:users_id,name:users_name,branch,batch,profile_pic,cover_pic,interests:[]}
        }
        if(interest_id && interest_name){
            batchmatesmap[users_id].interests.push(interest_name)
        }
    }
    const friends=Object.values(batchmatesmap);          // Removes the keys from the map, keeps only the values
    response.json(friends)
})

app.get("/api/pendingFriendsReceived",async(request,response)=>{
    const batchmatesQuery=await pool.query("SELECT users.id AS users_id,users.name AS users_name,users.batch,users.branch,users.profile_pic,users.cover_pic,interests.id AS interest_id,interests.name AS interest_name FROM users LEFT JOIN user_interest_table ON users.id=user_interest_table.user_id LEFT JOIN interests ON interests.id = user_interest_table.interest_id LEFT JOIN friends ON users.id=friends.sender_id WHERE friends.receiver_id=$1 AND friends.accepted=$2",[request.user.id,false])
    const batchmatesmap={}
    for(const row of batchmatesQuery.rows){
        const {
            users_id,users_name,batch,branch,profile_pic,cover_pic,interest_id,interest_name
        }=row

        if(!batchmatesmap[users_id]){
            batchmatesmap[users_id]={id:users_id,name:users_name,branch,batch,profile_pic,cover_pic,interests:[]}
        }
        if(interest_id && interest_name){
            batchmatesmap[users_id].interests.push(interest_name)
        }
    }
    const friends=Object.values(batchmatesmap);          // Removes the keys from the map, keeps only the values
    response.json(friends)
})

app.get("/api/pendingFriendsSent",async(request,response)=>{
    const batchmatesQuery=await pool.query("SELECT users.id AS users_id,users.name AS users_name,users.batch,users.branch,users.profile_pic,users.cover_pic,interests.id AS interest_id,interests.name AS interest_name FROM users LEFT JOIN user_interest_table ON users.id=user_interest_table.user_id LEFT JOIN interests ON interests.id = user_interest_table.interest_id LEFT JOIN friends ON users.id=friends.receiver_id WHERE friends.sender_id=$1 AND friends.accepted=$2",[request.user.id,false])
    const batchmatesmap={}
    for(const row of batchmatesQuery.rows){
        const {
            users_id,users_name,batch,branch,profile_pic,cover_pic,interest_id,interest_name
        }=row

        if(!batchmatesmap[users_id]){
            batchmatesmap[users_id]={id:users_id,name:users_name,branch,batch,profile_pic,cover_pic,interests:[]}
        }
        if(interest_id && interest_name){
            batchmatesmap[users_id].interests.push(interest_name)
        }
    }
    const friends=Object.values(batchmatesmap);          // Removes the keys from the map, keeps only the values
    response.json(friends)
})


const storage=multer.diskStorage({
    destination:(request,file,callback)=>{
        if(file.fieldname=="profile")
            callback(null,"../client/public/profile_pics/")
        else if(file.fieldname=="cover")
            callback(null,"../client/public/cover_pics/")
        else
            callback(new Error("ERROR"))
    },
    filename:(request,file,callback) => {
        const ext=path.extname(file.originalname)
        const uniqueName=request.user.id+"_"+file.fieldname+ext;
        callback(null,uniqueName)
    }
})

const upload=multer({storage})

app.post("/auth/verifyPics",upload.fields([
    {name:"profile",maxCount:1},
    {name:"cover",maxCount:1}
    ]),async(request,response)=>{
        const profile=`/profile_pics/${request.files["profile"]?.[0]?.filename}`
        const cover=`/cover_pics/${request.files["cover"]?.[0]?.filename}`
        await pool.query("UPDATE users SET profile_pic=$1,cover_pic=$2 WHERE id=$3",[profile,cover,request.user.id])
        return response.sendStatus(200)
    }
)

app.post("/api/acceptFriendRequest",async(request,response)=>{
    const {friendID}=request.body
    const userID=request.user.id
    await pool.query("UPDATE friends SET accepted=true WHERE sender_id=$1 AND receiver_id=$2",[friendID,userID])
    return response.sendStatus(200)
})

app.listen(SERVER_PORT)
