interface SectionHeaderProps{
    title:string;
}


export default function SectionHeader({title}:SectionHeaderProps){
    return(
        <div className="pb-8 flex gap-2">
            <div className="bg-[#FF6A33] w-1 h-auto"></div>
            <h2 className="text-3xl">{title}</h2>
        </div>
    )
}