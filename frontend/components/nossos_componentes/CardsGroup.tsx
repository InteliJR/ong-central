import React from "react";
import Card from "./Card";  // Ajuste o caminho conforme necessário

const CardsGroup: React.FC = () => {
  return (
    <div className="w-full px-4 sm:px-16 lg:px-32 py-8">
      {/* Grid responsivo com ajuste no gap */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 justify-items-center">
        <Card
          title="Doação de dinheiro"
          text="Contribua financeiramente para apoiar nossos projetos, ajudando a manter e expandir nossas ações para quem mais precisa."
          isHighlighted={true}
        />
        <Card
          title="Doação de Itens"
          text="Doe alimentos, roupas, produtos de higiene e outros itens que possam beneficiar pessoas em situação de vulnerabilidade."
        />
        <Card
          title="Trabalho Voluntário"
          text="Ofereça seu tempo e habilidades como voluntário, participando ativamente das atividades da Central da Solidariedade."
        />
      </div>
    </div>
  );
};

export default CardsGroup;
