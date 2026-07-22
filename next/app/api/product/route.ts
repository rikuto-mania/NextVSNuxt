import { NextRequest,NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

//全ての商品を取得するAPIエンドポイント
export async function GET(req:NextRequest) {
   //検索ワードの取得
    const searchWord = req.nextUrl.searchParams.get("searchWord");
    const where = searchWord ? {name:{contains:searchWord}} : {};
    try{
         const products = await prisma.product.findMany({
            where:where,
            orderBy:{
                created_at:"desc", 
            },
            include:{
                _count:{
                    select:{Review:true},
                },
                Image:true
            }
         });

         //平均評価取得
         const reviewAvg = await prisma.review.groupBy({
            by:["productId"],
            _avg:{
                level:true
            },
         })
         console.log(reviewAvg);
        
         //商品データ、平均評価を含めたオブジェクト作成
         const result = products.map(product =>{
            const rating = reviewAvg.find(
                r => r.productId === product.id
            );

            return  {...product,avgLevel:rating?._avg.level};
         })

        return NextResponse.json({status:"success",code:200,data:result},{status:200})
    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました",error: error instanceof Error ? error.message : String(error)},{status:500})
    }
}