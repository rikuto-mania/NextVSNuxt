import { prisma } from "../../utils/prisma";

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));
    if(!id) throw createError({statusCode:404,statusMessage:"商品が見つかりませんでした。"});

    try{
        const product = await prisma.product.findUnique({
            where: { id },
            include:{
                _count:{
                    select:{review:true}
                },
                image:true
            }
        }); 

         const reviewAvg = await prisma.review.groupBy({
            by:["productId"],
            _avg:{
                level:true
            },

        })

        const rating =  reviewAvg.find(
            r => r.productId === id
        );

        const result = {
            ...product,
            avg_level: rating?._avg.level ?? 0
        }
            


        return result
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})