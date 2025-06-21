import usePacientes from "../../hooks/usePacientes.jsx";
import Paciente from "./Paciente.jsx";
import React from "react";
import Spinner from "./Spinner.jsx";
import Heading from "./Heading.jsx";

function ListadoPacientes() {

    const {pacientes} = usePacientes()

    if (pacientes.length === 0) {
        return <div className={"flex flex-col items-center"}>
            <Heading titulo={"Aún no tienes pacientes"}
                     subtitulo={"Empieza a-Gestionarlos"}/>
            <Spinner/>
        </div>
    }
    return (
        <>
            {pacientes.length > 0 ? (
                <>
                    <Heading titulo={"Listado de Pacientes"}
                             subtitulo={"Gestiona tus-Pacientes y Citas"}/>

                    <ul className={"space-y-5 overflow-y-scroll max-h-[600px]"}>
                        {React.Children.toArray(pacientes.map(paciente => (
                            <li>
                                <Paciente
                                    paciente={paciente}
                                />
                            </li>
                        )))}
                    </ul>
                </>
            ) : (
                <>
                    <h2 className={"font-black  text-3xl text-center"}>No hay Pacientes</h2>
                    <p className={"text-xl mt-5 mb-10 text-center"}>
                        Comienza agregando Pacientes <span className={"text-indigo-600 font-bold"}>
                        y apareceran en este lugar
                    </span>
                    </p>
                </>
            )}
        </>
    );

}

export default ListadoPacientes;