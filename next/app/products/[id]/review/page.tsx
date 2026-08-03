"use client"

import SubmitButton from "@/components/submitButton"
import TextArea from "@/components/textArea"
import Breadcrumb from "@/components/Breadcrumb"
import { Icon } from "@iconify/react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import useApi from "@/hooks/useApi";
import SectionHeader from "@/components/common/SectionHeader";

export default function Review(){
    //レビュー状態管理
    const [reviewlevel,setReviewLevel] =useState<number>(5);
    const level:number[] = [1,2,3,4,5];
    const [description,setDescription] = useState<string>("");
    const route = useRouter();
    //商品ID取得
     const params = useParams();
     const productId = Number(params.id);


    const {fetchData} =useApi(`/api/review/${productId}`,"POST",true);

    //パンくずリスト
    const breadcrumb = [
        { name: '商品一覧', path: '/products' },
        { name: '商品詳細', path: `/products/${productId}` },
        { name: 'レビュー', path: `/products/${productId}/review` }
    ];

    const handleSubmit = async (e:React.ChangeEvent<HTMLElement>) =>{
        e.preventDefault();

        try{
            await fetchData({productId:productId,level:reviewlevel,description:description})
            route.push(`/products/${productId}`);
        }catch(error){
            console.error("レビューの送信に失敗しました:", error);
        }
    }

    return(
        <main>
            <section className="px-4 py-10 max-w-4xl mx-auto">
                <Breadcrumb items={breadcrumb} />
                <SectionHeader title="レビューを投稿" />
                <form onSubmit={handleSubmit}>
                    <div>
                        <p>評価</p>
                        <div className="flex flex-row">
                            {level.map((n) =>(
                                <Icon key={n} onClick={() => setReviewLevel(n)}  icon={n  <= reviewlevel ? 'material-symbols:star-rounded' : 'material-symbols:star-outline-rounded'} style={{color:'gold',fontSize:'48px'}}/>    
                            ))}
                        </div>
                    </div>
                    <TextArea  onChange={(e) => setDescription(e.target.value)} label="レビュー" id="review" name="review"/>
                    <SubmitButton value="投稿する" />
                </form>
            </section>
        </main>   
    )
}