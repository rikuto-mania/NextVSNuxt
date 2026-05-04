import {prisma} from "../../utils/prisma"
import bcrypt from "bcrypt"

export default defineEventHandler(async(event) =>{
    const body = await readBody(event);

    const {email,username,password,passwordConfilm} = body;

    if(!email || !username || !password || !passwordConfilm){
        return({statusCode:400,Message:"項目が入力されていません"})
    }
    if(password !== passwordConfilm){
        return({statusCode:400,Message:"パスワードが一致しません"})
    }

    const isExistingUser = await prisma.user.findUnique({
        where: { email }
    })

    if(isExistingUser){
        return ({statusCode:409,Message:"このメールアドレスはすでに登録されています"})
    }

    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const register = await prisma.user.create({
            data:{
                email: email,
                username : username,
                hashed_password: hashedPassword
            }
        })
        
        return ({statusCode:201,Message:"アカウントを作成しました"})
    }catch(error){
        throw error
    }
})
