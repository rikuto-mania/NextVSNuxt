import {prisma} from "../../utils/prisma"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";


export default defineEventHandler(async(event) =>{
    const body = await readBody<{email:string,password:string}>(event);
    const {email,password} = body || {};
    
    if(!email || !password) throw createError({statusCode:400,statusMessage:"入力した項目が不正です"});
      
    try{
        const user = await prisma.user.findUnique({
             where : {email}
        })

        if(!user) throw createError({statusCode:401,statusMessage:"ユーザーが見つかりましたでした"});        

        const isValid = await bcrypt.compare(password,user.hashed_password)
        if(!isValid) throw createError({statusCode:401,statusMessage:"パスワードが間違っています"});        

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
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})