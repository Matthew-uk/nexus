import React from 'react'
import Logo from "@/img/logo.png"
import Image from 'next/image'
import Link from 'next/link'
import { IoHomeOutline, IoWalletOutline, IoAddCircleOutline, IoCartOutline, IoMenu, IoPowerSharp } from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu";
import { CgProfile } from "react-icons/cg";
import useUserStore from '@/store/store';
import { Button } from './ui/button';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

const Navbar = () => {
    const {email, setEmail, setFirstName, setLastName, setId} = useUserStore();
    const router = useRouter()
    const handleLogout = () => {
        setEmail("");
        setFirstName("");
        setLastName("");
        setId("");
        router.push("/login");
        Cookies.remove("token");
    }

        
    return (
        <div className='md:px-36 hidden md:flex justify-between items-center font-poppins gap-8 py-4'>
            <div>
                <Image src={Logo} alt='Nexus' className='w-24 h-auto'/>
            </div>
            <ul className='flex items-center justify-between text-sm gap-4'>
                <li><Link href={"/dashboard"} className='flex flex-row items-center justify-center gap-2'><IoHomeOutline />Home</Link></li>
                <li><Link href={"/dashboard"} className='flex flex-row items-center justify-center gap-2'><IoWalletOutline /> Earn</Link></li>
                <li><Link href={"/dashboard"} className='flex flex-row items-center justify-center gap-2'><IoAddCircleOutline />Advertise</Link></li>
                <li><Link href={"/dashboard"} className='flex flex-row items-center justify-center gap-2'><IoCartOutline /> Market</Link></li>
                <li><Link href={"/dashboard"} className='flex flex-row items-center justify-center gap-2'><IoMenu />More</Link></li>
            </ul>
            <div className='flex items-center justify-center font-poppins'>
                <DropdownMenu>
                    <DropdownMenuTrigger className='outline-none ring-offset-0 font-light'><CgProfile size={23}/></DropdownMenuTrigger>
                    <DropdownMenuContent className='font-poppins'>
                        <DropdownMenuLabel className='font-medium'>{`${email}`}</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className='cursor-pointer'>My Profile</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Account Settings</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Team</DropdownMenuItem>
                        <DropdownMenuItem className='cursor-pointer'>Subscription</DropdownMenuItem>
                        <DropdownMenuItem><Button size={"icon"} onClick={handleLogout} className='w-full flex gap-4 bg-red-600 text-sm duration-300 ease-linear'><IoPowerSharp size={18} className='font-bold'/> Logout</Button></DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </div>
    )
}

export default Navbar