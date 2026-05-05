import {prisma} from "../../utils/prisma"
import bcrypt from "bcrypt"

export default defineEventHandler(async(event) =>{
    const body = await readBody(event);
    const {email,username,password,passwordConfilm} = body;

    if(!email || !username || !password || !passwordConfilm) throw createError({statusCode:400,statusMessage:"項目が入力されていません"});
    if(password !== passwordConfilm) throw createError({statusCode:400,statusMessage:"パスワードが一致しません"});

    const isExistingUser = await prisma.user.findUnique({
        where: { email }
    })

    if(isExistingUser) throw createError({statusCode:409,statusMessage:"このメールアドレスはすでに登録されています"});

    const hashedPassword = await bcrypt.hash(password,10);

    try{
        const register = await prisma.user.create({
            data:{
                email: email,
                username : username,
                hashed_password: hashedPassword
            }
        })
        
        return ({statusCode:201,statusMessage:"アカウントを作成しました"})
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})
