import { NextRequest, NextResponse } from "next/server";
import { actor } from "@/lib/session";
import { prisma } from "@/lib/prisma";

//カート全権取得API
export async function GET(req:NextRequest) {
     const {userId,sessionId} =  await actor(req);
     
        const dbUserid = userId || null;
        const dbSessionId = userId ? null : sessionId;

        try{
            const cart = await prisma.cart.findFirst({
                where:dbUserid ? {userId:dbUserid} : {sessionId:dbSessionId}
            });
            
            const result = cart ?  await prisma.cart_item.findMany({
                where:{cartId:cart.id},
                include:{
                    Product:{
                        include:{
                            Image:{
                                take:1,
                            }
                        }
                    }
                }
            }) :[];

            return NextResponse.json({status:"success",code:200,data:result},{status:200})
        }catch(err){
             return NextResponse.json({status:"error",code:500,message:"サーバーエラー",error:err},{status:500});
        }
}