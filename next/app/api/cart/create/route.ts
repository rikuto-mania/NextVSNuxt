import { NextRequest, NextResponse } from "next/server";
import { actor } from "@/lib/session";
import { prisma } from "@/lib/prisma";

//カート商品追加API
export async function POST(req:NextRequest) {
    const body = await req.json();

    const {userId,sessionId} =  await actor(req);
 
    const dbUserid = userId || null;
    const dbSessionId = userId ? null : sessionId;

    try{
        if(!body.productId) return NextResponse.json({"status":400,"message":"不正なリクエストです"},{status:400});

        //カート作成(作成されていない場合ば新規に作成。ログイン時はuserID、未ログイン時はゲストセッションで作成)
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
            return NextResponse.json({
                success: false,
                message: "カートが見つかりません。認証エラーか、カートがまだ作成されていません。",
            }); 
              
        }

         //カート商品追加
        const cartItem = await prisma.cart_item.upsert({
            where:{
                cartId_productId:{
                    cartId:cart.id,
                    productId:body.productId
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
                quantity:body.quantity
            }
        });

        return NextResponse.json({status:"success",code:201,message:"商品をカートに追加しました"},{status:201});
    }catch(err){
         return NextResponse.json({status:"error",code:500,message:"サーバーエラー"},{status:500});
    }
}