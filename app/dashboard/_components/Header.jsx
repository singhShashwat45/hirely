"use client";
import React from 'react'
import Image from 'next/image'
import { UserButton } from '@clerk/nextjs'
import { usePathname, useRouter } from 'next/navigation';

function Header() {
    const path = usePathname();
    const router = useRouter();

    const BackToHome = () => {
        router.push('/dashboard');
    }

    return (
        <div
            className="flex p-4 items-center justify-between shadow-sm cursor-pointer"
            style={{ backgroundColor: '#e4c8ff' }}
            >
            <div className="flex flex-row" onClick={BackToHome}>
                <Image src={'/hirely_simple.svg'} width={300} height={200} alt="logo" />
            </div>
            <ul className="flex gap-6 max-md:hidden">
                <li
                    onClick={BackToHome}
                    className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                        ${path === '/dashboard' ? 'text-fuchsia-500 font-bold underline' : ''}    
                    `}
                >
                    Dashboard
                </li>
                <li
                    className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                        ${path === '/dashboard/questions' ? 'text-fuchsia-500 font-bold underline' : ''}    
                    `}
                >
                    Questions
                </li>
                <li
                    className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                        ${path === '/dashboard/upgrade' ? 'text-fuchsia-500 font-bold underline' : ''}    
                    `}
                >
                    Upgrade
                </li>
                <li
                    className={`hover:text-fuchsia-500 hover:font-bold transition cursor-pointer
                        ${path === '/dashboard/how-it-works' ? 'text-fuchsia-500 font-bold underline' : ''}    
                    `}
                >
                    How it works
                </li>
            </ul>
            <div className="transition-transform duration-200 hover:scale-110">
                <UserButton />
            </div>
        </div>
    )
}

export default Header;
