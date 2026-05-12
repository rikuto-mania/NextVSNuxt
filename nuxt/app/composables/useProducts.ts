import type { AsyncData } from "#app";

interface Products{
  id:Number;
  name:string;
  price:number;
  created_at:Date;
  updated_at:Date;
  revie:string[];
  image:string[];
}

export function useProduct(id? :number){
  return useApi<Products>(`/products/${id}`);
}

export function useProducts(id? :number){
  return useApi<Products[]>("/products");
}

