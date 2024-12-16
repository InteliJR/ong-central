type CardProps = {
  title: string;
  text: string;
  isHighlighted?: boolean; // Prop para indicar se o card deve ter o fundo colorido
};

const Card: React.FC<CardProps> = ({ title, text, isHighlighted = false }) => {
  return (
    <div
      className={`p-6 border-[1px] rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 
        ${isHighlighted ? 'bg-green-100 border-[#4CAF50]' : 'bg-white border-[#4CAF50]'}
        w-full sm:w-[300px] h-[260px] sm:h-[260px]`}  // Ajuste de tamanho quadrado no mobile
    >
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-lg text-gray-600">{text}</p>
    </div>
  );
};

export default Card;
