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
                image:true
            }
         });

        
        return NextResponse.json({statusCode:200,message:"商品の取得に成功しました",data:item})
    }catch(error){
        return NextResponse.json({statusCode:500,message:"サーバーエラーが発生しました",error:error})
    }
}