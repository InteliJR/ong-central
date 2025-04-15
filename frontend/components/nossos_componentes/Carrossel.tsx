"use client"; 

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Button } from "@/components/shadcnui/button";
import DonationModal from "./DonationModal";

// Interface da campanha
interface Campaign {
  id: string | number;
  titulo: string;
  descricao: string;
  cor: string;
  prioridade: number;
}

// Propriedades do componente Carrossel
interface CarouselProps {
  title: string;
}

const Carousel: React.FC<CarouselProps> = ({ title }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showDonationModal, setShowDonationModal] = useState<boolean>(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);

  // Buscar campanhas da API
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://54.224.88.110:8000/campanhas/');
        
        if (!response.ok) {
          throw new Error('Falha ao carregar campanhas');
        }
        
        const data = await response.json();
        
        // Ordenar campanhas por prioridade (números maiores primeiro)
        const sortedCampaigns = [...data].sort((a, b) => b.prioridade - a.prioridade);
        setCampaigns(sortedCampaigns);
      } catch (err) {
        console.error('Erro ao carregar campanhas:', err);
        setError('Não foi possível carregar as campanhas. Tente novamente mais tarde.');
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  const nextCampaign = () => {
    if (campaigns.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % campaigns.length);
  };

  const prevCampaign = () => {
    if (campaigns.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex - 1 + campaigns.length) % campaigns.length);
  };

  // Função para detectar o gesto de swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    const touchStart = e.touches[0].clientX;

    const handleTouchEnd = (e: Event) => {
      const touchEvent = e as TouchEvent;
      const touchEnd = touchEvent.changedTouches[0].clientX;
      
      if (touchStart - touchEnd > 50) {
        nextCampaign(); // Navegar para a próxima campanha
      } else if (touchEnd - touchStart > 50) {
        prevCampaign(); // Navegar para a campanha anterior
      }
    };

    e.currentTarget.addEventListener("touchend", handleTouchEnd, { once: true });
  };

  const handleContributeClick = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
    setShowDonationModal(true);
  };

  if (loading) {
    return (
      <div className="relative w-full max-w-[1000px] sm:w-[90%] mx-auto p-5 rounded-3xl mt-12 mb-20 text-center">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">{title}</h2>
        <p>Carregando campanhas...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="relative w-full max-w-[1000px] sm:w-[90%] mx-auto p-5 rounded-3xl mt-12 mb-20 text-center">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">{title}</h2>
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (campaigns.length === 0) {
    return (
      <div className="relative w-full max-w-[1000px] sm:w-[90%] mx-auto p-5 rounded-3xl mt-12 mb-20 text-center">
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">{title}</h2>
        <p>Nenhuma campanha disponível no momento.</p>
      </div>
    );
  }

  const campaign = campaigns[currentIndex];

  return (
    <>
      <div className="relative w-full max-w-[1000px] sm:w-[90%] mx-auto p-5 rounded-3xl mt-12 mb-20">
        {/* Exibe o título do carrossel */}
        <h2 className="text-center text-2xl sm:text-3xl font-semibold mb-6">{title}</h2>

        {/* Botões de navegação (Laterais) - Somente exibido em telas maiores que mobile */}
        <div className="hidden sm:block">
          <button
            onClick={prevCampaign}
            className="absolute top-1/2 left-[-36px] transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-[15px] shadow-lg hover:bg-green-600 z-20"
          >
            &lt;
          </button>

          <button
            onClick={nextCampaign}
            className="absolute top-1/2 right-[-36px] transform -translate-y-1/2 bg-green-500 text-white p-3 rounded-[15px] shadow-lg hover:bg-green-600 z-20"
          >
            &gt;
          </button>
        </div>

        {/* Conteúdo da campanha */}
        {campaign && (
          <div
            className="relative w-full bg-white rounded-lg shadow-md p-6"
            onTouchStart={handleTouchStart}
            style={{ borderLeft: `6px solid ${campaign.cor}` }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Informações da campanha */}
              <div className="flex flex-col justify-between">
                <div>
                  <h3 className="text-xl md:text-2xl font-bold mb-2" style={{ color: campaign.cor }}>
                    {campaign.titulo}
                  </h3>
                  <p className="text-gray-600 mb-4">{campaign.descricao}</p>
                </div>
                
                <Button 
                  className="mt-6"
                  onClick={() => handleContributeClick(campaign)}
                  style={{ 
                    backgroundColor: campaign.cor, 
                    borderColor: campaign.cor,
                    color: '#fff',
                    transition: 'opacity 0.3s'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.opacity = '0.9'}
                  onMouseOut={(e) => e.currentTarget.style.opacity = '1'}
                >
                  Contribuir para esta campanha
                </Button>
              </div>
              
              {/* QR Code - Sempre usa o mesmo da pasta public */}
              <div className="flex flex-col items-center justify-center">
                <div className="bg-white p-4 rounded-lg border border-gray-200">
                  <Image 
                    src="/qrcode.png" 
                    alt={`QR Code PIX para ${campaign.titulo}`}
                    width={200}
                    height={200}
                    className="mx-auto"
                  />
                </div>
                <p className="text-sm text-gray-600 text-center mt-2">
                  Escaneie o QR Code com seu aplicativo bancário para doar
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Dots de navegação */}
        <div className="absolute bottom-[-30px] left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
          {campaigns.map((camp, index) => (
            <span
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full cursor-pointer`}
              style={{ 
                backgroundColor: currentIndex === index ? camp.cor : '#d1d5db',
                border: currentIndex === index ? `1px solid ${camp.cor}` : 'none'
              }}
            />
          ))}
        </div>
      </div>

      {/* Modal de Doação */}
      {selectedCampaign && (
        <DonationModal 
          isOpen={showDonationModal} 
          onOpenChange={setShowDonationModal}
          campaignTitle={selectedCampaign.titulo}
        />
      )}
    </>
  );
};

export default Carousel;
