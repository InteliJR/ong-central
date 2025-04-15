import React from "react";
import Card from "./Card";  // Ajuste o caminho conforme necessário

const CardsGroup: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-8 md:px-16 lg:px-32 py-8 md:py-12">
      {/* Flexbox com melhor adaptação e espaçamento */}
      <div className="flex flex-wrap justify-center gap-6 md:gap-8">
        <div className="flex-1 min-w-[280px] max-w-[400px]">
          <Card
            title="Doação de dinheiro"
            text="Contribua financeiramente para apoiar nossos projetos, ajudando a manter e expandir nossas ações para quem mais precisa."
            isHighlighted={true}
          />
        </div>
        <div className="flex-1 min-w-[280px] max-w-[400px]">
          <Card
            title="Doação de Itens"
            text="Doe alimentos, roupas, produtos de higiene e outros itens que possam beneficiar pessoas em situação de vulnerabilidade."
          />
        </div>
        <div className="flex-1 min-w-[280px] max-w-[400px]">
          <Card
            title="Trabalho Voluntário"
            text="Ofereça seu tempo e habilidades como voluntário, participando ativamente das atividades da Central da Solidariedade."
          />
        </div>
      </div>
    </div>
  );
};

export default CardsGroup;
