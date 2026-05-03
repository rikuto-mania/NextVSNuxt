import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));

    if(!id){
        return createError({statusCode:404,statusMessage:"レビューが見つかりませんでした"})
    }

    
    try{
        const deleteReview = await prisma.review.delete({
            where: { id },
        });

         return {statusCode:200,message:"レビューを削除しました"}
    } catch(error){
        return createError({statusCode:500,statusMessage:"サーバエラー"})
    }
})