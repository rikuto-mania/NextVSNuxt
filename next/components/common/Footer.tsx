import { Icon } from "@iconify/react";

export const Footer = () =>{
    return(
        <footer className="bg-[#2A2A2A] px-11 py-6 text-white">
            <div className="pb-9">
                <p className="text-[#FF6A33] text-2xl font-bold">Rikushop</p>
            </div>

            <hr className="border-t border-white" />

            <div className="flex gap-3 pt-9 justify-center items-center pb-3">
                <div className="border border-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Icon icon="pajamas:twitter" style={{ color: "white" }} width="24" height="24" />
                </div>
                <div className="border border-white rounded-full w-10 h-10 flex items-center justify-center">
                <Icon icon="ri:facebook-fill" style={{ color: "white" }} width="24" height="24" />
                </div>

                <div className="border border-white rounded-full w-10 h-10 flex items-center justify-center">
                    <Icon icon="mdi:instagram" style={{ color: "white" }} width="24" height="24" />
                </div>
            </div>
            <p className="text-center text-[12px]">Copyright © Rikushop. All Rights Reserved.</p>
        </footer>
    );
}