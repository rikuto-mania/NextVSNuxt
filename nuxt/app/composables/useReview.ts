interface ReviewRespnse{
    reviews:Review[];
    reviewCount:Rating;
}

export interface Review{
    id: number;
    productId: number;
    userId: number;
    level: number;
    description: string;
    created_at: Date;
    updated_at: Date;
    user:{
        username:string;
    }
}

export interface Rating{
    1: number,
    2: number,
    3: number,
    4: number,
    5: number
}



export const useReview = (id? :number) =>{
    const {data:reviewdata} = useFetch<ReviewRespnse>(`/api/review/${id}`);
    return {reviewdata}
}