import { productResponse,reviewResponse } from "@/types/api";
import ProductClient from "./ProductClient";

export const dynamicParams = true;


export async function generateStaticParams(){   
    try{
         const res = await fetch(`http://localhost:3000/api/product`);
        const json = await res.json();

        const products = Array.isArray(json?.data) ? json.data : Array.isArray(json);

        return products.map((item:any) =>{
            id : item.id.tiString()
        } )
    }catch(err){
        return []; 
    }
}


export async function ProductDetail({params}:{params:Promise<{id:string}>}){
    const {id} = await params;

    const fetchOptions = {next:{revalidate:60}}; 
    
    try{
         const [productRes,reviewRes] = await Promise.all([
            fetch (`http://localhost:3000/api/product/${id}`,fetchOptions),
            fetch(`http://localhost:3000/api/review/${id}`,fetchOptions)
        ]);

        const productData : productResponse = await productRes.json();
        const reviewData : reviewResponse = reviewRes.ok ? await reviewRes.json() : {status:404,message:"レビューがまだ投稿されていません",data:[]}

        return <ProductClient productData={productData} reviewData={reviewData}/>
    }catch(err){
        console.error(err);
        return <p>エラーが発生しました！</p>;
    }
}

export default ProductDetail;