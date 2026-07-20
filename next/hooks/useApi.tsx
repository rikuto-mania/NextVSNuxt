import { useEffect,useState,useCallback } from "react"
import Cookies from "js-cookie";


interface ApiErrorResponse {
    status: string;
    code: number;
    message: string;
}


const cookie = Cookies;
export const useApi =<T,D = unknown>(
    url: string,
    method: "GET" | "POST" | "PUT" | "DELETE",
    requireAuth: boolean = false,
    requestData?: D,
) => {
    const [data,setData] = useState<T | null>(null);
    const [loading,setLoading] = useState<boolean>(false);
    const [error,setError] = useState<unknown | null>(null);
    const [errorDetal,setErrorDetail] = useState<unknown | null>(null);

    //APIを呼び出す関数
    const fetchData = useCallback(
        async(requestData?:D) =>{
            setLoading(true);
            setError(null);
            setErrorDetail(null);

            try{
                let token:string | undefined;

                const response = await fetch(url,{
                    method,
                    body: method !== "GET" && requestData?JSON.stringify(requestData) : undefined,
                    credentials: "include",
                    headers:{
                        "Content-Type":"application/json",
                        ...(requireAuth && token ? {"Authorization": `Bearer ${token}`} : {})
                    }
                })

                //エラーハンドリング
                if(!response.ok){
                    const errorMessage = await getErrorMessage(undefined,response);
                    throw new Error(errorMessage);
                }

                const result =  await response.json();


                setData (result as unknown as T);
                return result;
            }catch(err){
                const errorMessage = err instanceof Error ? err.message: await getErrorMessage(err);
                setError(errorMessage);
                throw err;
            }finally{
                setLoading(false);
            }
        },
        [url,method]
    );


    //エラー生成関数
    const getErrorMessage = async(
        error?:unknown,
        response?:Response
    ):Promise<string> =>{
        if(response){
            let errorData: unknown;


            const rawText =  await response.text();
            try{
                errorData = await response.json();
            }catch(error){
                errorData = rawText;
            }
            
            console.error(`サーバーレスポンス：`,errorData);

            return  `サーバエラー：${response.status} - ${response.statusText}`
        }


        if(error instanceof TypeError){
            return "リクエストがされましたが応答がありません"
        }

        if(error instanceof Error){
             return "リクエストエラー"
        }

        return "不明なエラー"
    }

     //コンポーネントがマウントされたときに `GET` リクエストを自動で実行
    useEffect(() =>{
        if(method === "GET"){
            fetchData();
       }

    },[method,fetchData])

    //フックの戻り値
    return {data,loading,error,fetchData}
}

export default useApi;

