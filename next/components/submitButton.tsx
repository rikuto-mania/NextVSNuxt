interface buttonProps{
        value:string,
    }

export const SubmitButton = ({value}:buttonProps) =>{
    return (
        <button type="submit" className="bg-[#FF6A33] text-white border py-2.5 w-full rounded-full">
            {value}
        </button>
    );
}

export default SubmitButton;