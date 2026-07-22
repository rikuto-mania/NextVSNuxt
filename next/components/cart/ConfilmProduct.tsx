import Image from "next/image";

interface productCardProps{
    image?:string;
    title:string;
    price:number;
    quantity:number;
}
    

export const ConfilmProduct = ({image,title,price,quantity}:productCardProps) =>{
    return(
        <div className="flex justify-between items-center gap-6 w-full h-30">
        <div className="flex items-center">
                <div className="flex justify-center items-center bg-[#F2F1F1] w-30 h-30 rounded-2xl">
                    <Image src={`/products/${image}`} width="100" height="100" alt={title}/>
                </div>
                <div className="pl-3 md:pl-6 md:text-2xl">
                    <p className="font-medium pb-3">{title}</p>
                    <p className="font-bold">¥<span className="pl-1.5 text-[#FF6A33]">{price}</span></p>
                </div>
        </div>
            <p>数量：<span>{quantity}</span></p>
        </div>
    )
}