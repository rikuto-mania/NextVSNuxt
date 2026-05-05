import {prisma} from "../../utils/prisma";

export default defineEventHandler(async(event) =>{
    const body = await readBody(event);


    if(!body.name || !body.price) throw createError({statusCode:400,statusMessage:"未入力の項目があります"});

    try{
        const create = await prisma.product.create({
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

        return create
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})