import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event) =>{
    const query = getQuery(event);

     const searchTerm = query.search as string;
     const where = searchTerm ? { name: {contains : searchTerm} } : {};

     try{
        const searchProduct = await prisma.product.findMany({
            where: where,
            orderBy:{
                created_at: "desc"
            },
            include:{
                _count:{
                    select:{review:true}
                },
                image:true
            }
        })

        const reviewAvg = await prisma.review.groupBy({
            by:["productId"],
            _avg:{
                level:true
            },
        })

        const result = searchProduct.map(product =>{
            const rating =  reviewAvg.find(
                r => r.productId === product.id
            )


            return{...product,avg_level: rating?._avg.level}
        })

        return result

     }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
     }
})
