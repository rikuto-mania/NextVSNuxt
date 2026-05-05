import {prisma} from "../../utils/prisma"

export default defineEventHandler( async(event) => {
    const id = Number(getRouterParam(event,"id"));

    if(!id) throw createError({statusCode:404,statusMessage:"商品が見つかりませんでした。"});

    try{
        const deleteProduct = await prisma.$transaction([
            prisma.image.deleteMany({
                where: { productId:id },
            }),
            prisma.product.delete({
                where: { id },
            })
        ])

        return deleteProduct
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})