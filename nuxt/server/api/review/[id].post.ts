import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event) =>{
    const userId = 1;
    const productId = Number(getRouterParam(event,"id"));

    const body = await readBody(event);

    if (!body.description){
        return createError({statusCode:400,statusMessage:"入力されれいない項目があります"})
    }

    try{
        const create = await prisma.review.create({
            data:{
                productId:productId,
                userId: userId,
                level:body.level,
                description:body.description
            }
        });
        
        return {statusCode:200,message:"レビューを投稿しました！",data:create}
    }catch(error){
        console.error("🔥 ERROR:", error); // ← これ追加
        throw error; 
    }
})