import type { AsyncData } from "#app";

interface Products{
  id:number;
  name:string;
  price:number;
  created_at:Date;
  updated_at:Date;
  revie:string[];
  image:string[];
}

export function useProduct(id? :number){
  return useFetch<Products>(`/api/products/${id}`);
}

export function useProducts(id? :number){
  return useFetch<Products[]>("/api/products");
}

