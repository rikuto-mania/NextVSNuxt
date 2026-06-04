import { NextRequest,NextResponse } from "next/server";
import {prisma} from "@/lib/prisma";

//新しい商品を作成するエンドポイント
export async function POST(req:NextRequest) {
    const body =  await req.json();
   
    if(!body.name || !body.price) return NextResponse.json({status:"error",code:400,message:"入力内容に不備があります"},{status:400});
    
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

        
        return NextResponse.json({status:"success",code:201,data:createProduct},{status:201})
    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラーが発生しました"},{status:500})
    }
}