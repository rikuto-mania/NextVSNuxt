
//レビューAPI
export interface reviewResponse{
    status:number;
    message:string;
    data:review[];
}

interface review{
    id:number;
    productId:number;
    userid:number;
    description:string;
    level:Float16Array;
    created_at:Date;
    updated_at:Date;
}

//商品API
export  interface productResponse{
    status:number;
    message:string;
    data:products;
}

interface products{
    id:number;
    name:string;
    price:number;
    Image:Image[];
    _count:count;
    avgLevel:Float16Array;
    created_at:Date;
    updated_at:Date;
}

interface Image{
    id:number,
    productId: number;
    img_path: string;
    created_at:Date;
    updated_at: Date;
}


interface count{
    Review:number
}

//全商品API
export  interface productsResponse{
    status:number;
    message:string;
    data:products[];
}

interface products{
    id:number;
    name:string;
    price:number;
    Image:Image[];
    _count:count;
    avgLevel:Float16Array;
    created_at:Date;
    updated_at:Date;
}

interface Image{
    id:number,
    productId: number;
    img_path: string;
    created_at:Date;
    updated_at: Date;
}


interface count{
    Review:number
}