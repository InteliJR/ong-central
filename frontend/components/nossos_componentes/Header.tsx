'use client'
import React from 'react';
import { Button } from "../shadcnui/button";
import NotificationsDropdown from './NotificationsDropdown';
import Link from 'next/link';

function Header(){
    return (
        <header className="h-16 w-full px-[76px] flex flex-row items-center justify-between">
            <h1>Central da Solidariedade</h1>
            <div className="flex flex-row w-2/5 justify-between items-center h-full">
                <Link href="/">
                    <p className="cursor-pointer hover:text-gray-700 transition">Quem Somos?</p>
                </Link>
                <Link href="/partnership-page">
                    <p className="cursor-pointer hover:text-gray-700 transition">Nossos parceiros</p>
                </Link>
                <Link href="/donation-page">
                <div className="flex items-center space-x-2">
                    <NotificationsDropdown />
                    <Button className="bg-[#DD5656] hover:bg-[#BA3E3E]">Doar Agora!</Button>
                </div>
                </Link>
            </div>
        </header>
    )
}
export default Header;