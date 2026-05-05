import {prisma} from "../../utils/prisma"
import { requireAuth } from "../../utils/auth";

export default defineEventHandler(async(event) =>{
    const id = Number(getRouterParam(event,"id"));
    const {userId} = requireAuth(event);

    if(!id) return createError({statusCode:404,statusMessage:"レビューが見つかりませんでした"});

    //レビューを取得
    const review = await prisma.review.findUnique({
        where: {id:id}
    })

    if(review?.userId !== userId) throw createError({statusCode:403,statusMessage:"アクセス権限がありません"});

    const body = await readBody(event);

    if (!body.description) throw createError({statusCode:400,statusMessage:"入力されれいない項目があります"});

    try{
        const update = await prisma.review.update({
            where: { id },
            data:{
                level:body.level,
                description:body.description
            }
        });
        
        return {statusCode:200,statusMessage:"レビューの情報を更新しました"}
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバエラー"});
    }
})