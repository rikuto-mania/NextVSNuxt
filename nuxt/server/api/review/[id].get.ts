import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event)=>{
    const productId = Number(getRouterParam(event,"id"));
    try{
        const reviews = await prisma.review.findMany({
            where : { productId },
            orderBy:{
                created_at:"desc"
            },
            include:{
                user:{
                    select:{username:true}
                }
            }
        });

        const groupCounts = await prisma.review.groupBy({
            by:["level"],
            where:{productId},
            _count:{level:true}
        });

        const reviewCount:Record<number,number> ={5:0,4:0,3:0,2:0,1:0};

        groupCounts.forEach(group =>{
            reviewCount[group.level] = group._count.level;
        });

        return({reviews,reviewCount});
    }catch(errorr){
        throw createError({statusCode:500,statusMessage:"サーバエラー"})
    }
});