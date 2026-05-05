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
            }
        })

        return searchProduct
     }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
     }
})
