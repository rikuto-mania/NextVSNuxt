 interface formProps{
        label:string,
        type: "text" | "email" | "password",
        name:string,
        id:string,
        placeholder?:string,
        value?: string, 
    }

export const TextInput = ({label,type,name,id,placeholder,value}:formProps) =>{
    return (
        <div className="flex flex-col pb-6">
            <label htmlFor={id} className="pb-3">{label}</label>
            <input 
                type={type}
                name={name}
                id={id}                                                                     
                placeholder={placeholder} 
                value={value}
                className="px-3 py-2.5 rounded-lg border-2 border-[#BBB7B7] w-full"
             />
        </div>
    );
}  
export default TextInput;                                         