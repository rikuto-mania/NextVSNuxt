import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

//新しい商品を作成するエンドポイント
export async function POST(req:NextRequest) {
    const body =  await req.json();
   
    if(!body.name || !body.price) return NextResponse.json({statusCode:400,message:"商品名と価格は必須です"});
    
    console.log("受け取ったbodyの中身:", body);
    try{
        const createProduct = await prisma.product.create({
            data:{
                name:body.name,
                price:body.price,
                Image: {
                    create: body.Image.map((img_path:string) => ({ img_path }))
                }
            }
        });

        
        return NextResponse.json({statusCode:201,message:"商品の作成に成功しました",data:createProduct})
    }catch(error){
        return NextResponse.json({
            statusCode:500,message:"サーバーエラーが発生しました",
            error: error instanceof Error ? error.message : String(error)
        })
    }
}