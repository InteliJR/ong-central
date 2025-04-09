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
    <header className="h-16 px-6 md:px-32 border flex items-center justify-between relative">
      <Link href='/' className="flex items-center gap-2 md:gap-4">
        <Image src='/logo.svg' alt="Logo" height={40} width={40} />
        <p className="text-lg md:text-[24px] whitespace-nowrap">Central da Solidariedade</p>
      </Link>

      {/* Botão de menu mobile */}
      <button
        className="md:hidden"
        onClick={toggleMenu}
        aria-label="Abrir menu"
      >
        <Menu size={28} />
      </button>

      {/* Navegação para telas médias e grandes */}
      <nav className="hidden md:flex flex-row items-center w-1/2 justify-between">
        <Link href='partnership-page'>
          <p className="hover:underline">Entidades Parceiras</p>
        </Link>
        <Link href='org-page'>
          <p className="hover:underline">Para organizações</p>
        </Link>
        <Link href='donation-page'>
          <Button className="bg-[#DD5656] hover:bg-[#CD3333]">
            <strong>Doar Agora!</strong>
          </Button>
        </Link>
      </nav>

      {/* Menu dropdown mobile */}
      {isMenuOpen && (
        <div className="absolute top-16 left-0 w-full bg-white border-t shadow-md z-50 flex flex-col items-start p-4 gap-4 md:hidden">
          <Link href='partnership-page' onClick={() => setIsMenuOpen(false)}>
            <p className="hover:underline">Entidades Parceiras</p>
          </Link>
          <Link href='org-page' onClick={() => setIsMenuOpen(false)}>
            <p className="hover:underline">Para organizações</p>
          </Link>
          <Link href='donation-page' onClick={() => setIsMenuOpen(false)}>
            <Button className="w-full bg-[#DD5656] hover:bg-[#CD3333]">
              <strong>Doar Agora!</strong>
            </Button>
          </Link>
        </div>
      )}
    </header>
  );
}

export default Header;
