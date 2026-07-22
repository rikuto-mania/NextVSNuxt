"use client"

import {useState} from "react";
import { Icon } from "@iconify/react";
import { SearchBar } from "@/components/SearchBar";
import LoginDialog from "../dialog/LoginDialog";

export const Header = () =>{
    const [isOpenDialog,setIsOpenDialog] = useState(false);

    const toggle = () =>{
        setIsOpenDialog(!isOpenDialog);
    }

    return(
         <header className=" border-b border-gray-400 px-6 py-5">
            <div className="flex items-center justify-between pb-3 sm:pb-0">
                <div className="flex gap-4">
                    <p className="text-[#FF6A33] text-4xl font-bold">Rikushop</p>
                    <div className="hidden sm:flex">
                        <SearchBar />
                    </div>
                </div>
                <div className="flex items-center gap-2">
                    <p className="text-lg" onClick={toggle}>ログイン</p>
                    { isOpenDialog && <div className=" bg-black/20 fixed inset-0 z-10 " onClick={() => toggle()}><LoginDialog onClose={() => toggle()} /></div> }
                    <Icon icon="mdi:cart" style={{ color: "#FF6A33" }} width="24px" height="24px" />
                </div>
            </div>
            <div className="sm:hidden">
                <SearchBar />
            </div>
        </header>
    )
}

export default Header;