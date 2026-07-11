interface CartResponse{
    statusCode:number;
    message:string;
    data:Cart[];
}

interface Cart{
    id: number;
    cartId: number;
    productId: number;
    quantity:number;
    created_at: Date;
    updated_at: Date;
    product:{
        id:number;
        name:string;
        price:number;
        created_at:Date;
    }
}

export const useReview = () =>{
    const {data:reviewdata} = useFetch<CartResponse[]>('/api/cart');
    return {reviewdata}
}