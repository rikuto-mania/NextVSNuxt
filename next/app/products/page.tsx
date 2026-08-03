"use client"

import useProducts from "@/hooks/useProducts";
import { useSearchParams } from "next/navigation";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";
import { useState } from "react";
import SectionHeader from "@/components/common/SectionHeader";


export default function Products(){
    const [page,setPage] = useState(1);
    const searchParams = useSearchParams()
    const ITEM_PER_PAGE = 24; 

    //useProduct使用
    const {data:productsData,loading:productsLoading} = useProducts();
    if(productsLoading) return <p>読み込み中...</p>;
    if(!productsData) return <p>商品情報を取得できませんでした</p> 

    //ページネーション管理
    const start = (page -1) * ITEM_PER_PAGE; //最初のページ
    const end = start + ITEM_PER_PAGE; //最後ののページ
    const totalPage = (productsData?.data.length / ITEM_PER_PAGE); //総ページ数

    return(
        <main>
            <div className="xl:max-w-5xl px-4 py-16 mx-auto">
                <SectionHeader title="商品一覧" />
                <section className="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 ">
                    {productsData?.data.slice(start,end).map((product) =>{
                        return(
                            <Link key={product.name} href={`products/${product.id}`}>
                                <ProductCard title={product.name} price={product.price} reviews={product._count.Review} image={product.Image[0].img_path} />
                            </Link>
                        )
                    })}
                </section>
                <section className="relative py-4">
                    {!(page === 1) && 
                        <Link href={`products?page=${page}`} className=" absolute left-0">
                            <button className="bg-[#FF6A33] text-white px-2 py-1.5" onClick={() => setPage(page -1)}>
                                戻る
                            </button>
                        </Link>
                    }

                    {page === totalPage &&
                        <Link href={`products?page=${page}`} className=" absolute right-0">
                        <button className="bg-[#FF6A33] text-white px-2 py-1.5" onClick={() => setPage(page  + 1)}>
                            進む
                        </button>
                    </Link>
                    }
                </section>
            </div>
        </main>
    )
}   