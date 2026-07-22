import { NextRequest, NextResponse } from "next/server";
import { actor } from "@/lib/session";
import { prisma } from "@/lib/prisma";

//カート商品更新API
export async function PUT(req:NextRequest,context:{params:Promise<{id:string}>}) {
    const body = await req.json();

    const {id} = await context.params;
    const cartItemId = Number(id);

    const {userId,sessionId} =  await actor(req);
 
    const dbUserid = userId || null;
    const dbSessionId = userId ? null : sessionId;
    try{
        if(!cartItemId) return NextResponse.json({"status":400,"message":"不正なリクエストです"},{status:400});
        
        const cart = await prisma.cart.findFirst({
            where: dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId}
        })

        if(!cart)return NextResponse.json({"status":404,"message":"カートが見つかりませんでした"},{status:404});

        const cartItem = await prisma.cart_item.findUnique({
            where:{id:cartItemId},
            include:{
                Cart:true
            }
        })

        if(!cartItem) return NextResponse.json({"status":404,"message":"カートアイテムが見つかりませんでした"},{status:404});

        const update_item = await prisma.cart_item.update({
            where:{id:cartItemId},
            data:{
                quantity:body.quantity
            }
        })

        return NextResponse.json({status:"success",code:200,message:"カートアイテムを更新しました"},{status:200});
    }catch(err){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラー"},{status:500});
    }
}

//カート商品削除API
export async function DELETE(req:NextRequest,context:{params:Promise<{id:string}>}) {
    const {id} = await context.params;
    const cartItemId = Number(id);

    const {userId,sessionId} =  await actor(req);
 
    const dbUserid = userId || null;
    const dbSessionId = userId ? null : sessionId;

    try{
        if(!cartItemId) return NextResponse.json({"status":400,"message":"不正なリクエストです"},{status:400});

        const cart = await prisma.cart.findFirst({
            where: dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId} 
        })

        if(!cart) return NextResponse.json({"status":404,"message":"カートが見つかりませんでした"},{status:404});

        const cartItem = await prisma.cart_item.findUnique({
            where:{id:cartItemId},
            include:{
                Cart:true
            }
        })

        if(!cartItem) return NextResponse.json({"status":404,"message":"カートアイテムが見つかりませんでした"},{status:404});

        const delete_item = await prisma.cart_item.delete({
            where:{id:cartItemId}
        })

        return NextResponse.json({status:"success",code:200,message:"カートアイテムを削除しました"},{status:200});
    }catch(err){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラー"},{status:500});
    }
}


