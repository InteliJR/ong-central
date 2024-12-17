"use client"; // Direção para o Next.js que este componente precisa ser renderizado no lado do cliente

import { useState } from "react";
import { Button } from "../shadcnui/button";
import NotificationsDropdown from './NotificationsDropdown';
import Link from 'next/link';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);  // Alterna o estado do menu
  };

  return (
    <header className="h-16 w-full px-4 sm:px-[76px] flex items-center justify-between bg-white shadow-md">
      <h1 className="text-xl font-bold">Central da Solidariedade</h1>

      {/* Menu Mobile (Ícone de Hambúrguer) */}
      <div className="flex sm:hidden">
        <button onClick={toggleMenu} className="text-2xl">
          &#9776; {/* Ícone de hambúrguer (três tracinhos) */}
        </button>
      </div>

      {/* Menu Desktop */}
      <div className="hidden sm:flex w-3/5 justify-between items-center h-full">
        <p>Quem Somos?</p>
        <p>Nossos parceiros</p>
        <Button className="bg-[#DD5656] hover:bg-[#BA3E3E]">Doar Agora!</Button>
      </div>

      {/* Menu Mobile (quando aberto) */}
      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-16 left-0 w-full bg-white shadow-lg sm:hidden`}  
      >
        {/* Conteúdo do Menu Mobile com margem de 76px à esquerda */}
        <div className="flex flex-col items-start py-4 gap-4 pl-[20px]">  {/* Adicionando margem à esquerda dos itens */}
          <p className="text-lg">Quem Somos?</p>
          <p className="text-lg">Nossos parceiros</p>
          {/* Removendo w-full para o botão não ocupar toda a largura */}
          <Button className="bg-[#DD5656] hover:bg-[#BA3E3E] sm:w-auto">Doar Agora!</Button> 
        </div>
      </div>
    </header>
  );
}

export default Header;
