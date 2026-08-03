"use client"

import { ConfilmProduct } from "@/components/cart/ConfilmProduct"
import useCart from "@/hooks/useCart";
import Breadcrumb from "@/components/Breadcrumb";
import SectionHeader from "@/components/common/SectionHeader";

export default function ConfilmCart(){
    const {data:cartData,loading:cartLoading,error:cartError} = useCart(); 


    if(cartLoading) return <p>読み込み中...</p>;
    if(cartError) return <p>エラーが発生しました</p>;
    if(!cartData?.data) return <p>カートの商品が見つかりませんでした。</p>

     //パンくずリスト
    const breadcrumb = [
        { name: 'カート', path: '/cart' },
        { name: '購入確認', path: `/cart/confilm`},
    ];

    return(
        <div className="flex-1">
            <section className="max-w-5xl mx-auto px-4 py-10">
                <Breadcrumb items={breadcrumb} />
                <SectionHeader title="購入確認" />
                {cartData.data &&(
                    <div className="flex gap-28.5 flex-col lg:flex-row-reverse justify-between">
                        <div>
                            <p>合計金額</p>
                            <p className="font-bold text-3xl pb-9">¥<span className="pl-1.5 text-[#FF6A33]">20000</span></p>
                            <button className="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">購入する</button>
                        </div>
                        <div className="flex flex-col xl:w-170">
                            {cartData.data.map((item,index) =>{
                                 return(
                                    <div className="flex flex-col" key={index}>
                                        <ConfilmProduct 
                                            title={item.Product.name}
                                            price={item.Product.price}
                                            image={item.Product.Image?.[0]?.img_path}
                                            quantity={item.quantity} 
                                        />
                                        {index !== cartData.data.length -1 &&(
                                            <hr className="border border-[#BBB7B7] my-6" /> 
                                        )}
                                    </div>
                                 )
                            })}
                           
                        </div>
                    </div>
                )}
                
            </section>
        </div>
    )
}