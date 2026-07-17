import { v4 as uuidV4 } from "uuid";


//セッションを取得する処理
export const actor =  async (event :any) =>{
    try{
        const {userId} = requireAuth(event);

        if(userId){
            return {userId:userId,sessionId:null}
        }
     }catch(err){
         console.log("未ログイン、または認証エラーのためゲストとして処理します");
     }

     let sessionId = getCookie(event,'guest_session_id');

     if(!sessionId){
        sessionId = uuidV4();

        setCookie(event,'guest_session_id',sessionId,{
            httpOnly:true,
            secure:process.env.NODE_ENV === "production",
            maxAge:60 * 60 * 24 * 30,
            path:"/"
        })
     }

     return {userId:null,sessionId:sessionId}
}

