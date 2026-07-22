import { NextRequest,NextResponse } from "next/server";
import {requireAuth} from "@/lib/auth";
import {prisma} from "@/lib/prisma"

//レビューAPI


//レビュー取得API
export async function GET(req:NextRequest,context:{params:Promise<{id:string}>}){
    const {id} = await context.params;

    const productId = Number(id);

    if(!productId) return NextResponse.json({"status":404,"message":"レビューが見つかりませんでした"},{status:404});

    try{
        const allReviews = await prisma.review.findMany({
            where:{productId:productId},
            orderBy:{
                created_at:"desc"
            },
            include:{
                User:{
                    select:{username:true}
                }
            }
            });

             const groupCounts = await prisma.review.groupBy({
                by:["level"],
                where:{productId},
                _count:{level:true}
            });

            const reviewCount:Record<number,number> ={5:0,4:0,3:0,2:0,1:0};

            groupCounts.forEach(group =>{
                reviewCount[group.level] = group._count.level;
            });

            const reviewRespose = {allReviews,reviewCount}

        return NextResponse.json({"status":200,data:reviewRespose});
    }catch(error){
        return NextResponse.json({"status":500,"message":"サーバーエラーが発生しました"},{status:500}); 
    }
}

//レビュー作成API
export async function POST(req:NextRequest,context:{params:Promise<{id:string}>}){
    const {id} = await context.params;
    const productId = Number(id);

    if(!productId) return NextResponse.json({status:"error",code:404,message:"商品がみつかりませんでした"},{status:404});
    
    const auth = requireAuth(req);
    if(!auth) return  NextResponse.json({"status":403,"message":"アクセス権がありません"},{status:403});

    const body = await req.json();

    const user = await prisma.user.findUnique({
        where:{id:auth?.userId}
    })
    if(!user) return NextResponse.json({status:"error",code:404,message:"ユーザーがみつかりませんでした"},{status:404});

    try{
         const createReview = await prisma.review.create({
            data:{
                userId:user.id,
                productId:productId,
                level:body.level,
                description:String(body.description),
            }
        })

        return NextResponse.json({"status":201,"message":"レビューを投稿しました"});
    }catch(error){
        return NextResponse.json({"status":500,"message":"サーバーエラーが発生しました"},{status:500}); 
    }
   
}


//レビュー更新API
export async function PUT(req:NextRequest,context:{params:Promise<{id:string}>}) {
    const {id} = await context.params;
    const reviewId = Number(id);
    if(!reviewId) return NextResponse.json({"status":404,"message":"レビューが見つかりませんでした"},{status:404});

    const auth = requireAuth(req);
    if(!auth) return  NextResponse.json({"status":403,"message":"アクセス権がありません"},{status:403});

    const body = await req.json();

    try{
        const updateReview = await prisma.review.update({
            where:{id:reviewId},
            data:{
                level:body.level,
                description: String(body.description),
            },
           
        })

         return NextResponse.json({"status":200,"message":"レビューを更新しました"});
    }catch(error){
         return NextResponse.json({"status":500,"message":"サーバーエラーが発生しました",error: error instanceof Error ? error.message : String(error)},{status:500}); 
    }

}

//レビュー削除API
export async function DELETE(req:NextRequest,context:{params:Promise<{id:string}>}) {
    const {id} = await context.params;
    const reviewId = Number(id);
    if(!reviewId) return NextResponse.json({"status":404,"message":"レビューが見つかりませんでした"},{status:404});

    const auth = requireAuth(req);
    if(!auth) return  NextResponse.json({"status":403,"message":"アクセス権がありません"},{status:403});

    try{
        const deleteReview = await prisma.review.delete({
            where:{id:reviewId}
        })

        return NextResponse.json({"status":200,"message":"レビューを削除しました"});
    }catch(error){
         return NextResponse.json({"status":500,"message":"サーバーエラーが発生しました"},{status:500}); 
    }

}