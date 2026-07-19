import useApi from "./useApi";

interface reviewResponse{
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
    level:Float16Array;
    created_at:Date;
    updated_at:Date;
}

export interface rating{
    1: number,
    2: number,
    3: number,
    4: number,
    5: number
}


export default function useReviews(id:number){
    return useApi<reviewResponse>(`http://localhost:3033/api/review/${id}`,"GET");
}
