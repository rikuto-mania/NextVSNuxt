export default defineEventHandler(async(event) =>{
    const cartItemId = Number(getRouterParam(event,"id"));
    const {userId,sessionId} =  await actor(event);
     
    const dbUserid = userId || null
    const dbSessionId = userId ? null : sessionId;

    const body = await readBody(event);

    try{
        if(!cartItemId) throw createError({statusCode:400,statusMessage:"不正なリクエストです"});

        const cart = await prisma.cart.findFirst({
            where: dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId}
        });

        if(!cart) throw createError({statusCode:404,statusMessage:"カートが見つかりませんでした"});

        const cartItem = await prisma.cart_item.findUnique({
            where: {id:cartItemId},
            include:{
                cart:true
            }
        })

        if(!cartItem?.id) throw createError({statusCode:404,statusMessage:"カートアイテムが見つかりませんでした"});

        if(cartItem.cart.userId  !== userId) throw createError({statusCode:403,statusMessage:"アクセス権限がありません"});

        const update_item = await prisma.cart_item.update({
            where: { id: cartItemId },
            data: {
                quantity: body.quantity,
            }
        });

        return {statusCode:200,message:"カートアイテムを更新しました"}
        
    
    }catch(error){
        throw createError({statusCode:500,statusMessage:"サーバエラー"});
    }
     
})