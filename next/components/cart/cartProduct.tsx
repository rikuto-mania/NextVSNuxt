import Image from "next/image";
import { Icon } from "@iconify/react";
import useApi from "@/hooks/useApi";

interface productCardProps{
    id:number;
    image?:string;
    title:string;
    price:number;
    quantity:number;
    onDelete:(id:number) => void;
    onUpdate:(id:number,newQuantity:number) => void;
}

export const CartProduct = ({id,image,title,price,quantity,onDelete,onUpdate}:productCardProps) =>{
    const {fetchData:updateData} = useApi(`http://localhost:3030/api/cart/${id}`,"PUT");
    const {fetchData:deleteData} = useApi(`http://localhost:3030/api/cart/${id}`,"DELETE");
   
    // //商品削除
    const handleDeletedItems = async() =>{
        try{
            await deleteData();
            onDelete(id);
        }catch(error){
            console.error("商品の削除に失敗しました", error);
        }
    }

    // //数量更新
    const handleRemoveQuantity = async() =>{
        if(quantity <= 1) return;
        const newQuantity = quantity - 1;
        try{
            await updateData({quantity:newQuantity});
            onUpdate(id,newQuantity);
        }catch(error){
            console.error("商品の更新に失敗しました", error);
        }
    }   

    const handleAppendQuantity = async() =>{
        const newQuantity = quantity + 1;
        try{
            await updateData({quantity:newQuantity});
            onUpdate(id,newQuantity);
        }catch(error){
            console.error("商品の更新に失敗しました", error);
        }
    }   

    return(
        <div className="flex justify-between items-center gap-6 w-full h-30">
            <div className="flex items-center">
                    <div className="flex justify-center items-center bg-[#F2F1F1] w-30 h-30 rounded-2xl">
                        <Image src={`/products/${image}`}  width="100" height="100" alt={title} />
                    </div>
                    <div className="pl-3 md:pl-6 md:text-2xl">
                        <p className="font-medium pb-3 text-[16px]">{title}</p>
                        <p className="font-bold">¥<span className="pl-1.5 text-[#FF6A33]">{price}</span></p>
                    </div>
            </div>
            <div className="flex flex-col items-end justify-between h-full">
                <Icon  onClick={handleDeletedItems} icon="material-symbols-light:close-rounded" style={{color:"#F21010" }} fontSize="24px"/>
                <div className="flex gap-3 md:gap-9  px-3 py-2 border border-[#BBB7B7] rounded-full">
                    <Icon onClick={handleRemoveQuantity} icon="ic:round-minus"  fontSize="24px"/>
                    <p >{quantity}</p>
                    <Icon onClick={handleAppendQuantity} icon="ic:round-plus" fontSize="24px"/>
                </div>
            </div>
        </div>
    )
}