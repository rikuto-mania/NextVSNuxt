export default defineEventHandler(async(event) =>{
    const cartItemId = Number(getRouterParam(event,"id"));
    const {userId,sessionId} =  await actor(event);
     
    const dbUserid = userId || null
    const dbSessionId = userId ? null : sessionId;
 
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

        if(!cartItem) throw createError({statusCode:404,statusMessage:"カートアイテムが見つかりませんでした"});

        const delete_item = await prisma.cart_item.delete({
            where: { id: cartItemId },
        });

        return {statusCode:200,message:"カートアイテムを削除しました"}
    } catch(error){
        console.error("Error deleting cart item:", error);
        throw createError({statusCode:500,statusMessage:"サーバエラー"});
    }
})