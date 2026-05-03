import {prisma} from "../../utils/prisma"

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));

    if(!id){
        return createError({statusCode:404,statusMessage:"レビューが見つかりませんでした"})
    }

    const body = await readBody(event);

    if (!body.description){
        return createError({statusCode:400,statusMessage:"入力されれいない項目があります"})
    }

    try{
        const update = await prisma.review.update({
            where: { id },
            data:{
                level:body.level,
                description:body.description
            }
        });
        
        return {statusCode:200,message:"レビューの情報を更新しました"}
    }catch(error){
        return createError({statusCode:500,statusMessage:"サーバエラー"})
    }
})