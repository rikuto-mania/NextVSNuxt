import jwt from "jsonwebtoken"


export const requireAuth = (event: any) =>{
    const token = getCookie(event,"token");

    if(!token) throw createError({statusCode:401,statusMessage:"ログインがされていません"})
    
    try{        
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {
            userId :number
        };
        return decoded
    }catch(error){
        throw createError({statusCode:401,statusMessage:"トークンが無効です"})
    }

}

//MEMO
//Nuxt4ではh3 や nitropack(readBody, setCookie, createError)などはimportを省略して記述することができる