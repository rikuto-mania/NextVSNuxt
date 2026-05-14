import { useState} from "react";
import Link from "next/link";
import TextInput from "@/components/textInput";
import { SubmitButton } from "@/components/submitButton";

export const LoginDialog = () =>{
    const [isLoginMode,setIsLoginMode] = useState(true);

    //モード切り替え
    const toggleMenu = () =>{
        setIsLoginMode(!isLoginMode);
    }

    return(
        <div className="flex justify-center p-4 z-20" onClick={(e) => e.stopPropagation()}>
            <div className="px-8 py-9 w-131  md:rounded-l-2xl bg-white z-10">
                <p className="font-bold text-2xl pb-12">{isLoginMode ? "ログイン" : "新規登録"}</p>
                <TextInput label="メールアドレス" type="email" name="mail" id="mail" placeholder="exsample@rikushop.com"/>
                <TextInput label="パスワード" type="password" name="password" id="password" />

                <div v-if="!isLoginMode">
                    <TextInput label="パスワード(確認)" type="password" name="passwordConfilm" id="passwordConfilm" />
                </div>
                <div className="md:px-18.5">
                    <SubmitButton value= {isLoginMode ? 'ログイン' : 'アカウントを作成'}/>
                </div>
                <p className="text-center  pt-4">{isLoginMode ? "アカウントはありませんか？" : "アカウントはありますか？"}
                    <span className="text-[#FF6A33] rounded-4xl" onClick={() => toggleMenu()}>
                        {isLoginMode ? "新規登録" : "ログイン"}
                    </span>
                </p>
            </div>
            <div className="bg-[#FF6A33] w-79 h-auto rounded-r-2xl hidden md:block"></div>
        </div>
    );
}

export default LoginDialog;


