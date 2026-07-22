import Link from "next/link";
import { Icon } from "@iconify/react";

interface BreadcrumbItem{
    name: string;
    path: string;
}
interface BreadcrmbProps{
    items:BreadcrumbItem[];
}

export const Breadcrumb = ({items} :BreadcrmbProps) =>{
    return(
         <nav aria-label="breadcrumb" className="pb-4">
            <ol className="flex items-center text-gray-500 gap-2">
                {items.map((item,index) =>(
                    <li key={index} className="flex items-center ">
                        {index > 0 &&(
                            <Icon icon="formkit:right" fontSize="24px"  className="text-gray-400"/>
                        )}

                        {index === items.length -1 ?(
                                <span className="text-[#FF6A33] font-semibold" aria-current="page">
                                    {item.name}
                                </span>
                            ):(
                                <Link href={item.path} className="hover:text-[#FF6A33] huver:underline transition-colors">
                                    { item.name }
                                </Link>
                            )
                        }
                    </li>
                ))}
            </ol>
        </nav>
    )
}

export default Breadcrumb