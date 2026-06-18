import useApi from "./useApi";

interface productResponse{
    status:number;
    message:string;
    data:products[];
}

interface products{
    id:number;
    name:string;
    price:number;
    Image?:string[];
    _count:count;
    avgLevel:Float16Array;
    created_at:Date;
    updated_at:Date;
}

interface count{
    Review:number
}

export default function useProducts(){
    return useApi<productResponse>("http://localhost:3033/api/product","GET");
}

