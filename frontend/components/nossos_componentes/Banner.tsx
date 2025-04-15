import Image from "next/image";
import Link from "next/link";
import { Button } from "../shadcnui/button";

function Banner() {
  return (
    <div className="h-[calc(100vh-64px)] w-full bg-blue-900 px-4 sm:px-32 py-12 sm:pt-[56px] sm:pb-[80px] bg-cover bg-center flex flex-col justify-between" style={{ backgroundImage: 'url(background.png)' }}>
      {/* Título */}
      <div className="w-full flex justify-center sm:justify-start">
        
        <h1 className="text-[48px]/[1.1] sm:text-[56px] text-white font-extrabold text-center sm:text-left w-full sm:w-1/2">
          Central da Solidariedade
        </h1>
      </div>

      {/* Descrição e Botão */}
      <div className="w-full flex flex-col items-center sm:items-end gap-8">
        <Link href="/donation-page" className="w-full h-12 items-center flex flex-row sm:items-end justify-end">
          <Button className="bg-[#DD5656] hover:bg-[#BA3E3E] h-12 sm:h-16 w-full sm:w-2/5 rounded-3xl text-[16px] sm:text-[32px]">
            Quero Doar!
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default Banner;
