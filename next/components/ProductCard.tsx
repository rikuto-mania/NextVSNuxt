import Image from "next/image";

interface ProductCardProps{
    image:string;
    title:string;
    price:number;
    reviews:number;
}



export const ProductCard = ({image,title,price,reviews}:ProductCardProps) =>{
    const imagepath = `/products/${image}`

    return (
       <div>
            <div className="bg-[#F2F1F1] w-full md:w-60 h-60 rounded-2xl flex justify-center items-center">
                <Image  src={imagepath} alt={"product01"} width={200} height={200}/>
            </div>
            <p className="text-2xl font-medium py-3">{title}</p>
            <p className="font-bold">¥<span className="pl-1.5 text-[#FF6A33]">{price}</span></p>
            <p><span className="text-yellow-400 pr-1.5">★★★★★</span>({reviews})</p>
        </div>
    );
}

export default ProductCard;