import passport from "passport";
import { Strategy } from "passport-local";
import pool from "../db/database.mjs"
import bcrypt,{genSaltSync} from "bcrypt"

passport.use(
    new Strategy({usernameField:"roll"},async(roll,password,done) => {
        try{
            const userQuery=await pool.query("SELECT * FROM users WHERE roll=$1",[roll])
            const user=user.rows[0]
            if(!user) throw new Error("Incorrect credentials")
            if(!bcrypt.compareSync(password,user.password)) throw new Error("Incorrect credentials")
            done(null,user)
        }
        catch(err){
            done(err,null)
        }
    })
)

passport.serializeUser((user,done)=>{
    done(null,user.id)
})

passport.deserializeUser(async (id,done)=>{
    try{
        const userQuery=await pool.query("SELECT * FROM users WHERE id=$1",[id])
        const user=user.rows[0]
        if(!user) return response.sendStatus(400)
        done(null,user)
    }
    catch(err){
        console.log(err)
    }
})