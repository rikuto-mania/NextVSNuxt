import {prisma} from "../../utils/prisma"
import { requireAuth } from "../../utils/auth";

export default defineEventHandler(async(event) =>{
    const {userId} = requireAuth(event);
    const productId = Number(getRouterParam(event,"id"));

    const user = await prisma.user.findUnique({
        where: {id: userId}
    })
    
    if(!user) throw createError({statusCode:404,statusMessage:"ユーザが見つかりません"})

    const body = await readBody(event);

    if (!body.description) throw createError({statusCode:400,statusMessage:"入力されていない項目があります"})

    try{
        const create = await prisma.review.create({
            data:{
                productId:productId,
                userId: user.id,
                level:body.level,
                description:body.description
            }
        });
        
        return {statusCode:200,message:"レビューを投稿しました！",data:create}
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"} )
    }
})