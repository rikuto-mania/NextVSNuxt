
import useApi from "./useApi";

interface cartResponse{
    status:number;
    message:string;
    data:Cart[];
}

interface Cart{
    cartId:number;
    productId:number;
    quantity:number;
    created_at:Date;
    updated_at:Date;
    Product:Product;
}

interface Product{
    id:number;
    name:string;
    price:number;
    created_at:Date;
    updated_at:Date;
}

export default function useCart(){
    return useApi<cartResponse>(`http://localhost:3033/api/cart`,"GET");
}
