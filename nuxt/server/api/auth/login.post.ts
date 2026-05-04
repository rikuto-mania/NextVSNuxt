import {prisma} from "../../utils/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export default defineEventHandler(async(event) =>{
    const body = await readBody<{email:string,password:string}>(event);
    const {email,password} = body || {};
    
    if(!email || !password){
        return ({statusCode:400,Message:"入力した項目が不正です"})
    }

    try{
        const user = await prisma.user.findUnique({
             where : {email}
        })

        if(!user){
            return ({statusCode:401,Message:"ユーザーが見つかりましたでした"})        
        }

        const isValid = await bcrypt.compare(password,user.hashed_password)

        if(!isValid){
            return ({statusCode:401,Message:"パスワードが間違っています"})        
        }

        const token = jwt.sign(
            {userId: user.id},
            process.env.JWT_SECRET!,
            { expiresIn: "1h"}
        )

        setCookie(event,"token",token,{
            httpOnly:true,
            secure: process.env.NODE_ENV === "production",
            sameSite:"lax",
            path:"/",
            maxAge: 60 * 60
        })

        return ({statusCode:200,Message:"ログイン完了",token:token})
    }catch(error){
        throw error
    }
})