const Presentation = () => {
    return (
      <div className="bg-image h-[450px] lg:h-[550px] drop-shadow-xl p-5 w-full flex flex-col items-between justify-between gap-4 text-center">
        <div className="flex flex-col items-start justify-center">
            <h1 className="text-3xl text-start lg:text-6xl font-bold text-title">
                Entrena Inteligente
            </h1>
            <h1 className="text-3xl text-start lg:text-6xl font-bold text-title">
                No Solo Duro
            </h1>
            <p className="text-lg text-start font-bold lg:text-2xl text-title mt-4 max-w-2xl">
                Planes adaptados a tus objetivos y nivel. Comienza hoy y alcanza tu mejor versión.
            </p>
        </div>
        
        <div className="w-full flex items-center justify-end gap-2">
            <p className="font-bold text-[#D9B504]">Empieza tu transformación hoy</p>
            <a href="#planes" className="p-2 bg-on hover:bg-hover text-gris rounded-lg font-bold">Planes</a>
        </div>
        
      </div>
    );
  };
  
  export default Presentation;
  