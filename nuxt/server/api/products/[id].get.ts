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

        return product
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})