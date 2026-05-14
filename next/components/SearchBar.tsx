import {Icon} from "@iconify/react";

export const SearchBar = () =>{
    return(
        <div className="w-90 relative">
        <input type="text" className="pl-3 pr-12 py-2.5 w-90 bg-[#F2F1F1]" placeholder="商品を検索する" /> 
        <Icon icon="material-symbols:search-rounded" style={{color: "black" }} width="2em" className="absolute right-3 top-1/2 -translate-y-1/2"/>
    </div>
    );
}

export default SearchBar;