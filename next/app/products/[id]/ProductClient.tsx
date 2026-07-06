"use client"

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { productResponse,reviewResponse } from "@/types/api";

type Props = {
    productData:productResponse;
    reviewData:reviewResponse;
}


export default function({productData, reviewData}:Props){
    const images = productData?.data.Image || [];
    const reviews = reviewData?.data || [];

    const initialImage = images[0].img_path || "";
    const [selectedImage,setSelectedImage] =useState<string>(initialImage);

    const pieces = Array.from({length: 99},(_,i) => i +1)
    return(
        <main>
            <section className="flex flex-col md:flex-row justify-between px-4 xl:px-11 py-10">
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
                        <select name="pieces" id="pieces" className="w-full py-2.5 border border-[#BBB7B7]">
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
                    <button className="w-full py-2.5 bg-[#F2F1F1]">カートに追加</button>
                </div>
            </section>

            <section className="px-4 xl:px-11 py-10">
                <div className="pb-8 flex gap-2">
                    <div className="bg-[#FF6A33] w-1 h-auto"></div>
                    <p className="text-3xl">レビュー</p>
                </div>
                <hr className="border border-[#BBB7B7]" />       
                    {
                    
                        reviewData?.data.length ? (
                            reviewData?.data.map((review) =>(
                                <div key={review.id}>
                                        <div className="py-4">
                                            <p>{review.id}</p>
                                            <p className="text-yellow-400 pr-1.5">★★★★★</p>
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