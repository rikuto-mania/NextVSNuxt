import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextRequest,NextResponse } from "next/server"

export async function POST(req:NextRequest) {
    const body = await req.json();

    const existenceUser = await prisma.user.findUnique({
        where:{email:body.email}
    })

    if(existenceUser) return NextResponse.json({status:"error",code:409,message:"このメールアドレスはすでに登録されています"},{status:409});
    //パスワードハッシュ化
    const hashed_password = await bcrypt.hash(body.password,10);
    try{
        const register = await prisma.user.create({
            data:{
                email:body.email,
                username:body.username,
                hashed_password:hashed_password
            }
        });

        return NextResponse.json({status:"success",code:201,message:"ユーザー登録が完了しました"},{status:201});
    }catch(error){
          return NextResponse.json({message:"サーバーエラー"},{status:500});
    }
}