import { useState} from "react";
import Link from "next/link";
import TextInput from "@/components/textInput";
import { SubmitButton } from "@/components/submitButton";
import useApi from "@/hooks/useApi";

interface FormData{
    email:string;
    username:string;
    password:string;
    passwordConfilm:string;
}

interface Error{
    email?:string;
    username?:string;
    password?:string;
    passwordConfilm?:string;
}


export const LoginDialog = () =>{
    const [isLoginMode,setIsLoginMode] = useState(true);
    const [formData,setFormData] = useState<FormData>({
        email:"",
        username:"",
        password:"",
        passwordConfilm:""
    });

    const [errorData,setErrorData] = useState<Error>({});

    //モード切り替え
    const toggleMenu = () =>{
        setIsLoginMode(!isLoginMode);
    }

    const validation = () =>{
        const newErrors:Error = {};

        if( !formData.email) newErrors.email = "メールアドレスが入力されていません";
        if(!isLoginMode && !formData.username) newErrors.username = "名前が入力されていません";

        if(!isLoginMode && formData.password !== formData.passwordConfilm) {
            newErrors.password = "パスワードが一致しません";
             newErrors.passwordConfilm = "パスワードが一致しません";
        }

        if(formData.password.length <= 8) newErrors.password = "パスワード8文字以上で入力してください";
        if(!isLoginMode && formData.password.length <= 8)  newErrors.passwordConfilm = "パスワード8文字以上で入力してください";
        if(formData.password.length >= 72) newErrors.password =  "パスワードは72文字以内で入力してください";
        if(!isLoginMode && formData.password.length >= 72) newErrors.passwordConfilm = "パスワードは72文字以内で入力してください";

        setErrorData(newErrors);
        return Object.values(newErrors).length === 0;
    }


    const url = isLoginMode 
        ? "http://localhost:3033/api/auth/login"
        : "http://localhost:3033/api/auth/register";

  const {fetchData} = useApi(url,"POST");


    const handlesubmit = async (e:React.ChangeEvent<HTMLFormElement>) =>{
         e.preventDefault();

        if(validation()){
             const result = isLoginMode 
                ? fetchData({email:formData.email,password:formData.password}) 
                : fetchData({email:formData.email,username:formData.username,password:formData.password});
            if(!result || !result){
                return;
            }

            if(isLoginMode) toggleMenu;
        }
    }

    return(
        <div className="flex justify-center p-4 z-20">
            <div className="flex" onClick={(e) => e.stopPropagation()}>
                <div className="px-8 py-9 w-131  md:rounded-l-2xl bg-white z-10">
                    <p className="font-bold text-2xl pb-12">{isLoginMode ? "ログイン" : "新規登録"}</p>
                    <form onSubmit={handlesubmit}>
                        <TextInput 
                            label="メールアドレス" 
                            type="email" 
                            name="mail" 
                            id="mail" 
                            placeholder="exsample@rikushop.com" 
                            error={errorData.email} 
                            onChange={(e) => setFormData({...formData,email:e.target.value})}
                        />
                        {!isLoginMode &&
                             <TextInput 
                                label="名前" 
                                type="text" 
                                name="username" 
                                id="username" 
                                error={errorData.username} 
                                onChange={(e) => setFormData({...formData,username:e.target.value})}
                            />
                        }
                        <TextInput 
                            label="パスワード" 
                            type="password" 
                            name="password" 
                            id="password" 
                            error={errorData.password} 
                            onChange={(e) => setFormData({...formData,password:e.target.value})}
                        />
                        {!isLoginMode && 
                            <TextInput 
                            label="パスワード(確認)" 
                            type="password" 
                            name="passwordConfilm" 
                            id="passwordConfilm" 
                            error={errorData.passwordConfilm} 
                            onChange={(e) => setFormData({...formData,passwordConfilm:e.target.value})}
                            />
                        }
                        <div className="md:px-18.5">
                            <SubmitButton value= {isLoginMode ? 'ログイン' : 'アカウントを作成'}/>
                        </div>
                    </form>
                    <p className="text-center  pt-4">{isLoginMode ? "アカウントはありませんか？" : "アカウントはありますか？"}
                        <span className="text-[#FF6A33] rounded-4xl" onClick={() => toggleMenu()}>
                            {isLoginMode ? "新規登録" : "ログイン"}
                        </span>
                    </p>
                </div>
                <div className="bg-[#FF6A33] w-79 h-auto rounded-r-2xl hidden md:block"></div>
            </div>
        </div>
    );
}

export default LoginDialog;


