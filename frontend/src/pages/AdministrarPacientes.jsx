import Formulario from "../components/Formulario.jsx";
import ListadoPacientes from "../components/ListadoPacientes.jsx";
import {useState} from "react";

function AdministrarPacientes() {

    const [mostrarFormulario, setMostrarFormulario] = useState(true)

    function handleClickMostrarFormulario() {
        setMostrarFormulario(!mostrarFormulario)
    }

    return (
        <div className={"flex flex-col md:flex-row gap-5"}>
            <button
                type={"button"}
                className={`bg-[var(--color-primario)] text-white md:hidden font-bold uppercase mx-10 p-3 rounded-md`}
                onClick={handleClickMostrarFormulario}
            >
                {mostrarFormulario ? "Ocultar Formulario" : "Mostrar Formulario"}
            </button>
            <div className={`${mostrarFormulario ? "block" : "hidden"} md:w-1/2 lg:w-2/5`}>
                <Formulario/>
            </div>
            <div className={"md:w-1/2 lg:w-3/5"}>
                <ListadoPacientes/>
            </div>
        </div>
    );
}

export default AdministrarPacientes;