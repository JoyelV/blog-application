import Image from "next/image";
import Sidebar from "@/app/components/AdminComponents/Sidebar";
import { assets } from "@/Assets/assets";
import Link from "next/link";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex">
            <Sidebar />
            <div className="flex flex-col w-full">
                <div className="flex items-center justify-between w-full py-3 max-h-[60px] px-12 border-b border-black">
                    <h3 className="font-medium">Admin Panel</h3>
                    <Link href="/admin/profile">
                        <Image src={assets.profile_icon} width={40} alt="Profile" className="cursor-pointer" />
                    </Link>
                </div>
                {children}
            </div>
        </div>
    );
}
