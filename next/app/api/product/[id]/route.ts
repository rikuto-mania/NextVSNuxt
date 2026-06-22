import { prisma } from "@/lib/prisma"
import { NextRequest, NextResponse } from "next/server"

//商品IDに基づいて特定の商品を取得、更新、削除するAPIエンドポイント

//商品情報取得
export async function GET(req:NextRequest,context:{params: Promise<{id:string}>}) {
    const { id } = await context.params;
    const productid = Number(id);

    if (!productid) return NextResponse.json({status:"error",code:404,message:"商品がみつかりませんでした"},{status:404});
    try{
        const products =await prisma.product.findUnique({
            where: {id:productid},
            include:{
                _count:{
                    select:{Review:true}
                },
                Image:true,
            }
        });

        //平均評価取得
        const reviewAvg = await prisma.review.groupBy({
            by:["productId"],
            _avg:{
                level:true
            },
         });
         
        const rating = reviewAvg.find( r => r.productId === productid);
         
        //商品データ、平均評価を含めたオブジェクト作成
        const result = {...products,avgLevel:rating?._avg.level}
    
        return NextResponse.json({status:"success",code:200,data:result},{status:200})
    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました"},{status:500});
    }
}

//商品情報更新
export async function PUT(req:NextRequest,context:{params : Promise<{id:number}>}){
    const {id} = await context.params;
    const body = await req.json();
    const productId = Number(id);
    if (!productId) return NextResponse.json({status:"error",code:404,message:"商品がみつかりませんでした"},{status:404});

    try{
        const updateProduct = await prisma.product.update({
            where: { id:productId },
            data:{
                name:body.name,
                price:body.price,
                Image: {
                    create: body.Image.map((img_path:string) => ({ img_path }))
                }
            }
        })

        return NextResponse.json({status:"success",code:200,message:"商品の情報を更新しました"},{status:200});
    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました"},{status:500});
    }
}


//商品情報削除
export async function DELETE(req:NextRequest,context:{params: Promise<{id:string}>}) {
    const {id} = await context.params;
    const productId = Number(id);

    try{
        if(!productId) return NextResponse.json({status:"error",code:404,message:"商品がみつかりませんでした"},{status:404})

        const deletePriduct = await prisma.$transaction([
            prisma.image.deleteMany({
                where: {productId:productId}
            }),
            prisma.review.deleteMany({
                where:{productId:productId}
            }),
            prisma.product.delete({
                where:{id:productId}
            })
        ])
        return NextResponse.json({status:"success",code:200,message:"商品を削除しました"},{status:200});
    }catch(error){
         return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました"},{status:500});
    }
        
}