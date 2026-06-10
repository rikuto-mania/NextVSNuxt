import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//全ての商品を取得するAPIエンドポイント
export async function GET(req:NextRequest) {
   //検索ワードの取得
    const searchWord = req.nextUrl.searchParams.get("searchWord");
    const where = searchWord ? {name:{contains:searchWord}} : {};
    try{
         const item = await prisma.product.findMany({
            where:where,
            orderBy:{
                created_at:"desc", 
            },
            include:{
                _count:{
                    select:{Review:true},
                },
                Image:true,
            }
         });


        return NextResponse.json({status:"success",code:200,data:item},{status:200})
    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました",error: error instanceof Error ? error.message : String(error)},{status:500})
    }
}