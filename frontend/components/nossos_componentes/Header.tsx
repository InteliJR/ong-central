"use client"; // Direção para o Next.js que este componente precisa ser renderizado no lado do cliente

import { useState } from "react";
import { Button } from "../shadcnui/button";
import NotificationsDropdown from './NotificationsDropdown';
import Link from 'next/link';
import Image from "next/image";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);  // Alterna o estado do menu
  };

  return (
    <header className="h-16 px-64 border flex flex-row items-center justify-between">
      <p>Central Solidariedade</p>
      <div className="flex flex-row items-center w-1/2 justify-between">
      <p>Entidades Parceiras</p>
      <p>Para organizações</p>
      <Button className="bg-[#DD5656] hover:bg-[#CD3333]">
        <strong>Doar Agora!</strong>
      </Button>
      </div>

    </header>
  );
}

export default Header;
