import useApi from "./useApi";

interface reviewResponse{
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


export default function useReviews(id:number){
    return useApi<reviewResponse>(`http://localhost:3033/api/review/${id}`,"GET");
}
