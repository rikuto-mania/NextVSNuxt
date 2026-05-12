interface Review{
    id: number;
    productId: number;
    userId: number;
    level: Float16Array;
    description: string;
    created_at: Date;
    updated_at: Date;
}

export const useReview = (id? :number) =>{
   return useApi<Review[]>(`/review/${id}`)
}