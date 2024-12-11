import Cabecalho from "@/components/nossos_componentes/Cabecalho";
import Final from "@/components/nossos_componentes/Final";
import Carrossel from "@/components/nossos_componentes/Carrossel";
import CardsGroup from "@/components/nossos_componentes/CardsGroup"; // Ajuste o caminho conforme necessário


const images = [
  '/Campanha2.png',
  '/Campanha1.png'
];

export default function Home() {
  return (
    <>
      <Cabecalho />
      <CardsGroup />
      <Carrossel images={images} title="Campanhas em andamento" />
      <Final />
    </>
  );
}
