export interface Products{
  id:number;
  name:string;
  price:number;
  created_at:Date;
  updated_at:Date;
  _count:string[
    [review:number]
  ];
  image:string[
    [img_path:string]
  ];
}

export interface Review{
    id: number;
    productId: number;
    userId: number;
    level: Float16Array;
    description: string;
    created_at: Date;
    updated_at: Date;
}
