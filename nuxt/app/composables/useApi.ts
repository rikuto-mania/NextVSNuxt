import type { UseFetchOptions } from "nuxt/app"
import type {NitroFetchOptions} from "nitropack"


//defuのインポート
//defuとは左側のオブジェクト（options）に無いものを、右側のオブジェクト（defaults）から補完する」というツール。
import defu from "defu"

export const useApi = async <T>(
     url: string,
     method:"GET" | "POST" | "PUT" | "DELETE",
     options : NitroFetchOptions<string> = {},
) => {
    const config = useRuntimeConfig()
    const token = useCookie('token').value;

    const defaults: UseFetchOptions<T> = {
        baseURL: (config.public.apibase ||"http://localhost:3031/api") as string,
        method: method,
        headers: {
            Authorization : token ?  `Bearer ${token} `: ""   // クッキーからトークンを取得
        },

        onResponseError({response}){
            console.error('【サーバーからのエラー詳細】:', response._data);

            if(response.status === 401) {
                console.error('Unauthorized')
            }
        }
   } 
   //デフォルトと引数をマージ

   const params = defu(options,defaults)

   console.log("【Webから送信するデータ】:", params.body)
   return await $fetch(url,params)

   
}

//MEMO
//$fetchを使用したcomposable。usefetchはデータを取得するのに適しているが$fetchはPOST送信などユーザー操作時のイベントに適しているとわかった。