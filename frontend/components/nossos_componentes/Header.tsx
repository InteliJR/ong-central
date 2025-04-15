"use client";

import { useState } from "react";
import { Button } from "../shadcnui/button";
import NotificationsDropdown from './NotificationsDropdown';
import Link from 'next/link';
import Image from "next/image";
import { Menu } from "lucide-react";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <header className="h-16 px-4 sm:px-8 md:px-12 lg:px-32 border flex items-center justify-between relative">
      <Link href='/' className="flex items-center gap-2 md:gap-3 lg:gap-4">
        <Image src='/logo.svg' alt="Logo" height={40} width={40} className="h-8 w-8 sm:h-9 sm:w-9 md:h-10 md:w-10" />
        <p className="text-base sm:text-lg md:text-xl lg:text-[24px] whitespace-nowrap">Central da Solidariedade</p>
      </Link>

      {/* Botão de menu mobile */}
      <button
        className="lg:hidden"
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <Menu size={28} />
      </button>

      {/* Navegação para telas médias e grandes */}
      <nav className="hidden lg:flex flex-row items-center w-auto lg:w-1/2 justify-between gap-6">
        <Link href='partnership-page'>
          <p className="hover:underline text-sm md:text-base">Entidades Parceiras</p>
        </Link>
        <Link href='org-page'>
          <p className="hover:underline text-sm md:text-base">Para organizações</p>
        </Link>
        <Link href='donation-page'>
          <Button className="bg-[#DD5656] hover:bg-[#CD3333] text-sm md:text-base">
            <strong>Doar Agora!</strong>
          </Button>
        </Link>
      </nav>

      {/* Menu dropdown para mobile e tablet */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md z-50 flex flex-col items-start p-4 gap-4 lg:hidden">
          <Link href='partnership-page' onClick={() => setIsMenuOpen(false)}>
            <p className="hover:underline text-base sm:text-lg">Entidades Parceiras</p>
          </Link>
          <Link href='org-page' onClick={() => setIsMenuOpen(false)}>
            <p className="hover:underline text-base sm:text-lg">Para organizações</p>
          </Link>
          <Link href='donation-page' onClick={() => setIsMenuOpen(false)} className="w-full">
            <Button className="w-full bg-[#DD5656] hover:bg-[#CD3333] text-base sm:text-lg">
              <strong>Doar Agora!</strong>
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
