import { useState, useEffect } from 'react';
import clienteAxios from '../config/axios';
import Spinner from '../components/Spinner';
import { AiOutlineLeft } from "react-icons/ai";
import { CiLight } from "react-icons/ci";

export function Tienda() {
  const [productos, setProductos] = useState([]);
  const [pagina, setPagina] = useState(1);
  const [limite, setLimite] = useState(8);
  const [totalPaginas, setTotalPaginas] = useState(1);
  const [cargando, setCargando] = useState(false);
  const [filtros, setFiltros] = useState({
    nombre: '',
    categoria: '',
    tipoMascota: ''
  });
  const [tema, setTema] = useState('claro');

  useEffect(() => {
    const obtenerProductos = async () => {
      setCargando(true);
      try {
        const respuesta = await clienteAxios.post(
          `/api/productos/filtrar?pagina=${pagina}&limite=${limite}`,
          filtros
        );

        setProductos(respuesta.data.productos);
        setTotalPaginas(respuesta.data.paginas);
      } catch (error) {
        console.error('Error al obtener productos:', error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, [pagina, limite, filtros]);

  const handleChange = (e) => {
    setFiltros({
      ...filtros,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPagina(1);
  };

  const toggleTema = () => {
    setTema(tema === 'oscuro' ? 'claro' : 'oscuro');
  };

  return (
    <div className={`w-full min-h-screen ${tema === 'oscuro' ? 'bg-gray-900 text-gray-200' : 'bg-gray-100 text-gray-800'}`}>
      <div className="w-full max-w-none mx-auto p-5">
        <div className="flex justify-center items-center mb-8 mt-6">
          <h1 className="text-center text-5xl font-extrabold text-[var(--color-secundario)]">
            Catálogo de Productos
          </h1>
        </div>
        <div className="flex justify-center mb-5">
          <button
            onClick={toggleTema}
            className={`p-2 rounded-full text-white ${
              tema === 'oscuro'
                ? 'bg-[var(--color-secundario)]'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
          >
            <CiLight size={25} />
          </button>
        </div>

        <form
          onSubmit={handleSubmit}
          className="mb-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <input
            type="text"
            name="nombre"
            value={filtros.nombre}
            onChange={handleChange}
            placeholder="Buscar por nombre"
            className={`${
              tema === 'oscuro'
                ? 'bg-gray-800 text-gray-200 border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            } border border-[1px] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              tema === 'oscuro'
                ? 'focus:ring-[var(--color-secundario)]'
                : 'focus:ring-blue-200'
            } w-full sm:w-auto`}
          />

          <select
            name="categoria"
            value={filtros.categoria}
            onChange={handleChange}
            className={`${
              tema === 'oscuro'
                ? 'bg-gray-800 text-gray-200 border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            } border border-[1px] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              tema === 'oscuro'
                ? 'focus:ring-[var(--color-secundario)]'
                : 'focus:ring-blue-200'
            } w-full sm:w-auto`}
          >
            <option value="">Todas las categorías</option>
            <option value="6727305fe2fb7190289acf2c">Juguetes</option>
            <option value="6727305ae2fb7190289acf28">Salud</option>
            <option value="67273050e2fb7190289acf24">Alimentos</option>
          </select>

          <select
            name="tipoMascota"
            value={filtros.tipoMascota}
            onChange={handleChange}
            className={`${
              tema === 'oscuro'
                ? 'bg-gray-800 text-gray-200 border-gray-700'
                : 'bg-white text-gray-800 border-gray-300'
            } border border-[1px] px-3 py-2 rounded-lg focus:outline-none focus:ring-2 ${
              tema === 'oscuro'
                ? 'focus:ring-[var(--color-secundario)]'
                : 'focus:ring-blue-200'
            } w-full sm:w-auto`}
          >
            <option value="">Todos las mascotas</option>
            <option value="PERRO">Perro</option>
            <option value="GATO">Gato</option>
          </select>
        </form>

        {cargando ? (
          <div className="flex justify-center items-center min-h-[50vh]">
            <Spinner />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mt-8 px-4">
            {productos.length === 0 ? (
              <div className="col-span-full text-center text-gray-500">
                No hay productos disponibles.
              </div>
            ) : (
              productos.map((producto) => (
                <div
                  key={producto._id}
                  className={`${
                    tema === 'oscuro'
                      ? 'bg-gray-800 text-gray-200'
                      : 'bg-white text-gray-800'
                  } shadow-lg rounded-xl overflow-hidden transition-transform transform hover:scale-105 hover:shadow-2xl duration-300`}
                >
                  <div className="relative">
                  <img
                    src={`http://localhost:4000/uploads/${producto.imagen}`}
                    alt={producto.nombre}
                    className="w-full h-80 object-cover object-top"
                  /> {/*transition-all duration-300 ease-in-out hover:h-80*/}
                  </div>
                  
                  <div className="p-4">
                    <h3 className="text-lg font-semibold">{producto.nombre}</h3>
                    <p className="text-sm text-gray-600 mt-1">{producto.descripcion}</p>
                    <p className="font-bold text-2xl text-[var(--color-secundario)] mt-2">
                      ${producto.precio}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        <div className="flex justify-center items-center gap-5 mt-10">
          <button
            disabled={pagina <= 1}
            onClick={() => setPagina(pagina - 1)}
            className={`${tema === 'oscuro' ? 'bg-[var(--color-secundario)]' : 'bg-blue-500'} text-white p-4 rounded-full font-bold transition-opacity duration-300 ${
              pagina <= 1 ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
            }`}
          >
            <AiOutlineLeft size={20} />
          </button>
          <span className="text-lg font-semibold text-gray-400">
            Página {pagina} de {totalPaginas}
          </span>
          <button
            disabled={pagina >= totalPaginas}
            onClick={() => setPagina(pagina + 1)}
            className={`${tema === 'oscuro' ? 'bg-[var(--color-secundario)]' : 'bg-blue-500'} text-white p-4 rounded-full font-bold transition-opacity duration-300 ${
              pagina >= totalPaginas ? 'opacity-50 cursor-not-allowed' : 'hover:opacity-80'
            }`}
          >
            <AiOutlineLeft size={20} style={{ transform: 'rotate(180deg)' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
