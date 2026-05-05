import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event)=>{
    const productId = Number(getRouterParam(event,"id"));
    try{
        const reviews = await prisma.review.findMany({
            where : { productId },
            orderBy:{
                created_at:"desc"
            }
        })

        return reviews
    }catch(errorr){
        throw createError({statusCode:500,statusMessage:"サーバエラー"})
    }
})