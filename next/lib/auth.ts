import jwt from "jsonwebtoken";
import { NextRequest,NextResponse } from "next/server";

//認証ミドルウェア
export const requireAuth = (req:NextRequest) =>{
    const token = req.headers.get("authorization") ?.replace("Bearer","")

    if(!token) return null;

    try{
        const decoded = jwt.verify(token,process.env.JWT_SECRET!) as {
            userId:number;
        }

        return decoded;
    }catch(error){
        NextResponse.json({"status":500,"message":"サーバエラーが発生しました"},{status:500})
    }
}
