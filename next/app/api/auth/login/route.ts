import { NextRequest,NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function POST(req:NextRequest,res:NextResponse){
    const body = await req.json();
    const cookie = cookies();
    
    
    try{
        //メールアドレスでユーザー検索
        const user = await prisma.user.findUnique({
            where:{email:body.email}
        })

        if(!user) return NextResponse.json({status:"error",code:404,message:"ユーザが存在しません"},{status:404});

        //入力したパスワードをハッシュ化
        const hashed_password = await bcrypt.compare(body.password,user.hashed_password);

        //バリデーションチェック
        if(user.email !== body.email || !hashed_password) return NextResponse.json({status:"error",code:401,message:"パスワードが間違っています",},{status:401});

        
        const token = jwt.sign(
            {userId:user.id},
            process.env.JWT_SECRET!,
            {expiresIn: "1h"}
        );

        const res = NextResponse.json({status:"success",code:200,message:"ログイン成功",token:token})

       res.cookies.set("accessToken",token,{
            httpOnly:true,
            secure:process.env.NODE_ENV == "production",
            path:"/",
            maxAge: 60 * 60
       })       

       return res;

    }catch(error){
        return NextResponse.json({status:"error",code:500,message:"サーバーエラー"},{status:500});
    }
}


//MEMO
//Nextjsでのクッキー取得・設定はオブジェクトのメソッド呼び出しで行っている