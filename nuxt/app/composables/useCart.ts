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

export const useCart = async () =>{
    const {data:cartData} = useFetch<CartResponse>('/api/cart',{
        deep:true
    });
    return {cartData}
}

//MEMO 
//usefetchにdeepを設定すると変更監視の深さを制御することできる。
//falseに設定するとデータ構造の最上位のみリアクティブにする。