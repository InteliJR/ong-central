import Cabecalho from "@/components/nossos_componentes/Cabecalho";
import Final from "@/components/nossos_componentes/Final";
import Carousel from "@/components/nossos_componentes/Carrossel";
import CardsGroup from "@/components/nossos_componentes/CardsGroup";

export default function Home() {
  return (
    <>
      <Cabecalho />
      <CardsGroup />
      <Carousel title="Campanhas em andamento" />
      <Final />
    </>
  );
}
