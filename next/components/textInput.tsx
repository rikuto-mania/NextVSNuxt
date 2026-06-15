import React from "react";

 interface formProps{
        label:string,
        type: "text" | "email" | "password";
        name:string;
        id:string;
        placeholder?:string;
        error?:string;
        value?: string;
        onChange?:(e:React.ChangeEvent<HTMLInputElement>) => void;
    }

export const TextInput = ({label,type,name,id,placeholder,error,value,onChange}:formProps) =>{
    return (
        <div className="flex flex-col pb-6">
            <div className="flex gap-6">
                <label htmlFor={id} className="pb-3">{label}</label>
               {error &&  <p className="text-red-400">{error}</p>}
            </div>
            <input 
                type={type}
                name={name}
                id={id}                                                                     
                placeholder={placeholder} 
                value={value}
                className="px-3 py-2.5 rounded-lg border-2 border-[#BBB7B7] w-full"
                onChange={onChange}
             />
        </div>
    );
}  
export default TextInput;                                         