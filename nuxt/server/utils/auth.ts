import jwt from "jsonwebtoken"


export const requireAuth = (event: any) =>{
    const token = getCookie(event,"token");

    if(!token) return({statusCode:401,Message:"ログインがされていません"})
    
    try{        
        const decoded = jwt.verify(token,process.env.JWT_SECRET!);
        return decoded
    }catch(error){
        return ({statusCode:401,Message:"トークンが無効です"})
    }

}

//MEMO
//Nuxt4ではh3 や nitropack(readBody, setCookie, createError)などはimportを省略して記述することができる