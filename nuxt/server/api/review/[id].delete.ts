import {prisma} from "../../utils/prisma"
import { requireAuth } from "../../utils/auth";

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));
    const {userId} = requireAuth(event);

    if(!id) throw createError({statusCode:404,statusMessage:"レビューが見つかりませんでした"})

    const review = await prisma.review.findUnique({
        where: {id:id}
    })

    if(review?.userId  !== userId) throw createError({statusCode:403,statusMessage:"アクセス権限がありません"})
    
    try{
        const deleteReview = await prisma.review.delete({
            where: { id },
        });

         return {statusCode:200,message:"レビューを削除しました"}
    } catch(error){
        throw createError({statusCode:500,statusMessage:"サーバエラー"})
    }
})