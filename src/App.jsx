import { useState, useEffect } from "react";

function App() {
  const [Ciudad, setCiudad] = useState("argentina");

  const key = "982dd615c294f92f0bf9712f7320ef11";
  const ApiClima = `https://api.openweathermap.org/data/2.5/weather?q=${Ciudad}&appid=${key}`;

  const [Data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(ApiClima);
        const data = await response.json();
        setData(data);
        console.log(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [Ciudad]);

  const buscarCidad = (e) => {
    e.preventDefault();
    const ciudad = e.target.querySelector("#ciudad").value;
    setCiudad(ciudad);
  };

  return (
    <>
      <div className="flex justify-center flex-col bg-blue-400 w-screen h-screen">
        <div className="flex justify-center mb-10 -mt-10">
          {Data ? (
            <div>
              <h1 className="text-3xl font-mono">Pais: {Data.name}</h1>
              {Data.main ? (
                <div>
                  <h2 className="text-3xl font-mono">
                    Temperatura: {(Data.main.temp - 271.15).toFixed(1)} °C
                  </h2>
                  <h2 className="text-3xl font-mono">
                    Humedad: {Data.main.humidity}%
                  </h2>
                </div>
              ) : (
                <p>Los datos de temperatura y humedad no están disponibles.</p>
              )}
            </div>
          ) : (
            "Cargando datos..."
          )}
        </div>

        <form
          onSubmit={(e) => {
            buscarCidad(e);
          }}
        >
          <div className="flex justify-center">
            <div className="flex flex-col w-[30%]">
              <input
                type="text"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:white dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500"
                name="ciudad"
                id="ciudad"
              />
              <div className="flex justify-center mt-5">
                <button
                  type="submit"
                  className="bg-gray-600 w-[40%] flex justify-center  text-white font-bold py-2 px-4 rounded-full"
                >
                  Buscar Ciudad
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default App;
