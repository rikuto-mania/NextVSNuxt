import { prisma } from "../../utils/prisma";

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));
    if(!id) throw createError({statusCode:404,statusMessage:"商品が見つかりません"});

    const body = await readBody(event);
    if(!body.name || !body.price) throw createError({statusCode:400,statusMessage:"未入力の項目があります"});

    try{
        const update = await prisma.product.update({
            where: { id },

            data:{
                name: body.name,
                price: body.price,
                image: {
                    create: body.image.map((img_path:string) => ({
                        img_path
                    }))
                }
            }
        })

        return {
            statusCode: 200,
            statusMessage : "商品の情報を更新しました。"
        }
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})

