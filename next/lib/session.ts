import { v4 as uuidV4 } from "uuid";
import { requireAuth } from "./auth";
import {NextRequest,NextResponse} from "next/server";
import {cookies} from "next/headers";

//セッションを取得する処理
export const actor =  async (req:NextRequest) =>{
    try{
        const auth = requireAuth(req);

        if(auth?.userId){
            return {userId:auth.userId,sessionId:null}
        }
     }catch(err){
         console.log("未ログイン、または認証エラーのためゲストとして処理します");
     }

     let sessionId = req.cookies.get('guest_session_id')?.value;


     const res = NextResponse.json({
        userId:null,sessionId:sessionId
    })

     if(!sessionId){
        sessionId = uuidV4();

        res.cookies.set('guest_session_id', sessionId, {
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:60 * 60 * 24 * 30,
            path:"/"
        })
     }

     return res;
}

