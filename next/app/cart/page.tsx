"use client"

import Link from "next/link"
import useCart from "@/hooks/useCart";
import { CartProduct } from "@/components/cart/cartProduct"

import { useEffect, useState } from "react";
export default function Cart(){
    const {data:cartData,loading:cartLoading,error:cartError} = useCart(); 
    const [cartItems,setCartItems] = useState(cartData?.data ?? []);

   useEffect(() =>{
        if(cartData?.data){
            setCartItems(cartData.data);
        }
   },[cartData]);


    if(cartLoading) return <p>読み込み中...</p>;
    if(cartError) return <p>エラーが発生しました</p>;
    

    // 商品削除
    const handleDeletedItems = (deleteId:number) =>{
       setCartItems((prevItems) => prevItems.filter(item => item.id !== deleteId));
    }

    // 数量更新
    const handleUpdateQuantity = (id:number,newQuantity:number) =>{
         setCartItems((prevItems) =>
            prevItems.map((item) =>
                item.id === id ? {...item, quantity:newQuantity} : item
            )
        );
    }

    return(
        <div className="flex-1">
            <section className="max-w-5xl mx-auto px-4 py-10">
                 <div className="pb-8 flex gap-2">
                    <div className="bg-[#FF6A33] w-1 h-auto"></div>
                    <h2 className="text-3xl">あなたのカート</h2>
                </div>
                    {cartData?.data ? (
                        <div className="flex gap-28.5 flex-col lg:flex-row-reverse justify-between">
                            <div>
                                <p>合計金額</p>
                                <p className="font-bold text-3xl pb-9">¥<span className="pl-1.5 text-[#FF6A33]">20000</span></p>
                                <Link href="/cart/confilm">
                                    <button className="w-full lg:w-3xs py-2.5 text-white bg-[#FF6A33]">確認画面へ</button>
                                </Link>
                            </div>

                            <div className="flex flex-col xl:w-170">
                                {cartItems.map((item,index) =>{
                                    return(
                                        <div key={index} className="flex flex-col">
                                            <CartProduct 
                                                id={item.id}
                                                title={item.Product.name}
                                                price={item.Product.price}
                                                image={item.Product.Image?.[0]?.img_path}
                                                quantity={item.quantity}
                                                onDelete={handleDeletedItems}
                                                onUpdate={handleUpdateQuantity}
                                            />
                                            {index !== cartData.data.length -1 && (
                                                <hr className="border border-[#BBB7B7] my-6" /> 
                                            )}
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    ):(
                        <p className="text-bold text-3xl">カートは空です</p>
                    )}
            </section>
        </div>
    )
}