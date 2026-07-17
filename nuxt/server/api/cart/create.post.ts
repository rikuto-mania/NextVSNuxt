import { actor } from "~~/server/utils/session";
import { requireAuth } from "../../utils/auth";

export default defineEventHandler(async(event) =>{ 
    const body = await readBody(event);

   const {userId,sessionId} =  await actor(event);
 
    const dbUserid = userId || null
    const dbSessionId = userId ? null : sessionId;

    try{
        if(!body.productId)  throw createError({statusCode:404,statusMessage:"商品が見つかりません"});
        
        //カート作成(カートがない場合は新規に作成する)
        let cart = await prisma.cart.findFirst({
            where: dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId}
        })

        if(!cart){
            cart = await prisma.cart.create({
                data:{
                    userId:dbUserid,
                    sessionId: dbSessionId
                }
            })
        }

        if (!cart || !cart.id) {
            return {
                success: false,
                message: "カートが見つかりません。認証エラーか、カートがまだ作成されていません。",
            };
        }
        
        const cartItem =  await prisma.cart_item.upsert({
            where:{
                cartId_productId:{
                    cartId:cart.id,
                    productId:body.productId,
                },
            },

            update:{
                quantity:{
                    increment:body.quantity,
                },
            },

            create:{
                cartId:cart.id,
                productId:body.productId,
                quantity: body.quantity,
            }
        })
        
        return({statusCode:201,message:"カートに追加しました！",data:cartItem})
    
    }catch(error){
        console.error("エラー原因:",error);
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
}) 