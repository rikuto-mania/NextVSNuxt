import type { UseFetchOptions } from "nuxt/app"
import defu from "defu"

export const useApi = <T>(
     url: string | (() => string),
     options : UseFetchOptions<T> = {}
) => {
   const config = useRuntimeConfig()
   const defaults: UseFetchOptions<T> = {
        baseURL: (config.public.apibase ||"http://localhost:3000/api") as string,
        headers: {
            Authorization : `Bearer${useCookie('token').value}`   // クッキーからトークンを取得
        },

        onResponseError({response}){
            if(response.status === 401) {
                console.error('Unauthorized')
            }
        }
   } 

   //デフォルトと引数をマージ
   const params = defu(options,defaults)

   return useFetch(url,params)
}