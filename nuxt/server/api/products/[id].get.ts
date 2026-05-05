import { prisma } from "../../utils/prisma";

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));
    if(!id) throw createError({statusCode:404,statusMessage:"商品が見つかりませんでした。"});

    try{
        const product = prisma.product.findUnique({
            where: { id }
        }); 

        return product
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})