"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productResponse,reviewResponse } from "@/types/api";
import { Icon } from "@iconify/react";
import Breadcrumb from "@/components/Breadcrumb";
import useApi from "@/hooks/useApi";

type Props = {
    productData:productResponse;
    reviewData:reviewResponse;
}

type ReviewLevel = 1 | 2 | 3 | 4 | 5;

export default function({productData, reviewData}:Props){
    const images = productData?.data.Image || [];
    const reviews = reviewData?.data || [];
    const rawLevels:ReviewLevel[] = [5,4,3,2,1];
    const starLevels:ReviewLevel[] = [1,2,3,4,5];
    const [quantity,setQuantity] = useState<number>(1);
    const initialImage = images[0].img_path || "";
    const [selectedImage,setSelectedImage] =useState<string>(initialImage);

     const {fetchData} = useApi("http://localhost:3033/api/cart/create","POST",true);

    //平均レビュー
    const avgReview = () =>{
        if(!reviews.reviewCount || reviews.allReviews.length === 0) return;

        const counts = reviews.reviewCount;

        const totalScore =(
            (5 * counts[5] || 0) + 
            (4 * counts[4] || 0) + 
            (3 * counts[3] || 0) + 
            (2 * counts[2] || 0) + 
            (1 * counts[1] || 0)
        );

        return (totalScore / reviews.allReviews.length).toFixed(1);
    }

    //レビューパーセンテージ取得
    const getParcentage = (level:ReviewLevel) =>{
        if(!reviews.reviewCount || reviews.allReviews.length === 0) return;

        const count = reviews.reviewCount[level] || 0;
        return Math.round((count / reviews.allReviews.length) * 100);
    }

     //パンくずリスト
    const breadcrumb = [
        { name: '商品一覧', path: '/products' },
        { name: '商品詳細', path: `/products/${productData.data.id}`},
    ];

    //選択個数
    const pieces = Array.from({length: 99},(_,i) => i +1);

    //カート追加
    const handleSubmit = async () =>{
        await fetchData({productId:productData.data.id,quantity:quantity});
        
    }


    return(
        <main className="px-4 xl:px-11 py-10">
            <Breadcrumb items={breadcrumb} />
            <section className="flex flex-col md:flex-row justify-between">
                <div className="flex flex-col md:flex-row">
                    <div className="flex flex-row md:flex-col gap-3 md:pr-4.5 pb-3">
                        {images.map((image,index) =>{
                            return(
                                 <div className="flex justify-between items-center w-12 h-12 bg-[#F2F1F1]" onClick={() => setSelectedImage(image.img_path)} key={index}>
                                    <Image src={`/products/${image.img_path}`} alt="image" width={80} height={80} />
                                 </div>
                            )
                        })}
                       
                    </div>
                    <div className="flex flex-col md:flex-row">
                        <div className="w-full h-100 md:w-100 md:h-100 bg-[#F2F1F1] flex items-center justify-center">
                            <Image src={`/products/${selectedImage}`} alt={productData.data.name} width={360} height={360} />
                        </div>
                        <div className="md:pl-9 py-3">
                            <p className="text-4xl">{productData?.data.name}</p>
                            <p className="font-bold text-2xl hidden md:block">¥<span className="pl-1.5 text-[#FF6A33]">{productData?.data.price}</span></p>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col gap-4 w-full md:w-50 justify-center">
                    <p className="font-bold text-4xl">¥<span className="pl-1.5 text-[#FF6A33]">{productData?.data.price}</span></p>
                    <div className="pb-2.5 ">
                        <label htmlFor="pieces">個数を選択</label>
                        <select name="pieces" id="pieces" className="w-full py-2.5 border border-[#BBB7B7]" value={quantity} onChange={(e) => setQuantity(Number(e.target.value))}>
                            {pieces.map((num) =>{
                                return(
                                    <option key={num} value={num}>
                                        {num}
                                    </option>
                                );
                            })}
                        </select>
                    </div>
                    <button className="w-full py-2.5 text-white bg-[#FF6A33]">購入する</button>
                    <button onClick={handleSubmit} className="w-full py-2.5 bg-[#F2F1F1]" >カートに追加</button>
                </div>
            </section>

            <section className="px-4 xl:px-11 py-10">
                <div className="pb-8 flex gap-2">
                    <div className="bg-[#FF6A33] w-1 h-auto"></div>
                    <p className="text-3xl">{reviews.allReviews.length}件のレビュー</p>
                </div>
                {reviews.allReviews.length > 0 &&(
                    <div className="pb-8">
                        {rawLevels.map((level) =>(
                            <div className="flex items-center pb-2" key={level}>
                                {starLevels.map((n) =>(
                                    <Icon key={n} icon={n  <= level ? 'material-symbols:star-rounded' : 'material-symbols:star-outline-rounded'} style={{color:'gold',fontSize:'24px'}}/>    
                                ))}
                                 <div className="flex items-center gap-4">
                                    <div className="w-64 h-2 bg-gray-400">
                                        <div className="h-2 bg-[#FF6A33]" style={{width:`${getParcentage(level)}%`}}></div>
                                    </div>
                                    <p className=" text-gray-500">{reviews.reviewCount[level] || 0}</p>
                                </div>
                            </div>
                        ))}
                        <Link href={`/products/${productData.data.id}/review`} >
                            <button className="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33] mt-5">レビューを投稿する</button>
                        </Link>
                    </div>
                )}

                <hr className="border border-[#BBB7B7]" />       
                    {
                        reviews.allReviews.length  >0 ? (
                            reviews.allReviews.map((review) =>(
                                <div key={review.id}>
                                    <div className="py-4">
                                        <p className="font-semibold">{review.User.username}</p>
                                        <div className="flex pb-3">
                                             {starLevels.map((n) =>(
                                                <Icon key={n} icon={n  <= review.level ? 'material-symbols:star-rounded' : 'material-symbols:star-outline-rounded'} style={{color:'gold',fontSize:'24px'}}/>    
                                            ))}
                                        </div>
                                        <p>{review.description}</p>
                                    </div>
                                    <hr className="border-b border-[#BBB7B7]"></hr>
                                </div>
                            ))
                        ):(
                             <div className="flex flex-col py-4">
                                <p className="text-center pb-2">レビューが投稿されていません</p>
                                <Link href={"/review/create"} className="bg-[#FF6A33] text-white rounded-full px-5 py-2 text-center">投稿する</Link>
                            </div>
                        )
                    }
            </section>
        </main>
    )
}