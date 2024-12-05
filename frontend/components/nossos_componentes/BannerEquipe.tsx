type TeamCardProps = {
    name: string;
    image: string;
  };
  
  function TeamCard({ name, image }: TeamCardProps) {
    return (
      <div className="border border-green-200 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
        <img
          src={image}
          alt={name}
          className="w-full h-56 object-cover rounded-t-lg"
        />
        <div className="p-4 text-center">
          <p className="text-lg font-semibold text-gray-800">{name}</p>
        </div>
      </div>
    );
  }
  
  export default function PaginaEquipe() {
    return (
      <div className="bg-white min-h-screen grid place-items-center p-8">
        <div className="w-11/12 sm:w-4/5 lg:w-2/3 mx-auto space-y-16">
          <div className="text-center">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">
              <strong>Conheça</strong>
            </h2>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
              A <span className="text-green-600">equipe</span> da Central da Solidariedade
            </h1>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            <TeamCard name="Nome 1" image="/images/generic1.jpg" />
            <TeamCard name="Nome 2" image="/images/generic2.jpg" />
            <TeamCard name="Nome 3" image="/images/generic3.jpg" />
          </div>
        </div>
      </div>
    );
  }
  