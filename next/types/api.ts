
//レビューAPI
export interface reviewResponse{
    status:number;
    message:string;
    data:data;
}

interface data{
    allReviews:review[];
    reviewCount:rating;
}

interface review{
    id:number;
    productId:number;
    userid:number;
    description:string;
    level:number;
    created_at:Date;
    updated_at:Date;
    User:{
        username:string;
    }
}

export interface rating{
    1: number,
    2: number,
    3: number,
    4: number,
    5: number
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