
import React from "react";
import Card from "./Card";  // Ajuste o caminho conforme necessário

const CardsGroup: React.FC = () => {
  return (
    <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <Card title="Doação de dinheiro" text="Contribua financeiramente para apoiar nossos projetos, ajudando a manter e expandir nossas ações paa quem mais precisa." isHighlighted={true}/>
        <Card title="Doação de Itens" text="Doe alimentos, roupas, produtos de higiene e outros itens que possam beneficiar pessoas em situação de vulnerabilidade."  />
        <Card title="Trabalho Voluntário" text="Ofereça seu tempo e habilidades como voluntário, participando ativamente das atividades da Central da Solidariedade." />
    </div>
  );
};

export default CardsGroup;
