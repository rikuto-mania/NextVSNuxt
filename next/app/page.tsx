"use client"

import {useState} from "react";
import { ProductCard } from "@/components/ProductCard";
import { Icon } from "@iconify/react";
import Link from "next/link";
import useApi from "@/hooks/useApi";
import useProducts from "@/hooks/useProducts";

//ダミー背景用カラー配列
  const slider = [
    'from-[#FF6A33] to-[#FFD900]',
    'from-[#3d9fb5] to-[#FFD900]',
    'from-[#FBA233] to-[#FFD900]',
  ];

export default function Home() {
  //カルーセル状態管理
  const [current,setCurrent] = useState(0);
  
  //カルーセルを次の画像へ変更
  const next = () =>{
    setCurrent((current + 1) % slider.length);
  }
   //カルーセルを前の画像へ変更
  const prev = () =>{
    setCurrent((current - 1 + slider.length) % slider.length);
  }

  //useProduct使用
  const {data:productsData} = useProducts();

  return (
    <main>
      <div className="min-h-screen">
      <div className="relative overflow-hidden w-full ease-in-out">
        <div 
          className="flex transition-transform duration-500" 
          style={{ transform: `translateX(-${current * 100}%)` }}
        >
          {slider.map((bg,index) =>(
            <div 
            key={index}
            className={`w-full h-120 shrink-0 bg-linear-to-t ${bg}`}
        
          ></div>
          ))}
          
        </div>

        <button onClick={() => prev()} className="absolute p-3 bg-white/80 rounded-full top-1/2 left-3 -translate-y-1/2 flex items-center justify-center">
          <Icon icon="formkit:left" style={{color: "black"}} width="24px" height="24px" />
        </button>

          <button onClick={() => next()} className="absolute p-3 bg-white/80 rounded-full top-1/2 right-3 -translate-y-1/2 flex items-center justify-center">
          <Icon icon="formkit:right" style={{color: "black"}} width="24px" height="24px"/>
        </button>
      </div>

      <section className="max-w-5xl mx-auto px-4 py-16">
        <div className="pb-8">
          <p className="text-3xl">新しい商品</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-4 gap-6 pb-10">
          {productsData?.data.slice(0,7).map((product) =>{
            return(
              <ProductCard key={product.name} title={product.name} price={product.price} reviews={product._count.Review} />
            )
          })}
        </div>

        <div className="flex justify-center"> 
          <Link href="/products" className="text-white text-center bg-[#FF6A33] px-8 py-2.5">もっと見る</Link>
        </div>
      </section>
      </div>
    </main>
  );
}
