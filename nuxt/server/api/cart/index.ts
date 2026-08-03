export default defineEventHandler(async(event)=>{
     const {userId,sessionId} =  await actor(event);
     
    const dbUserid = userId || null
    const dbSessionId = userId ? null : sessionId;

    try{
        const cart = await prisma.cart.findFirst({
            where: dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId}
        });


        const cartItems = cart ? await prisma.cart_item.findMany({
            where: {cartId:cart.id},
            include:{
                product:{
                    include:{
                        image:{
                            take:1,
                        }
                    }
                }
            }
        }) : [];

        return {statusCode:200,message:"カート情報を取得しました",data:cartItems}


    }catch(error){
        console.error("エラー原因:",error);
        throw createError({statusCode:500,statusMessage:"サーバーエラー"});
    }
})