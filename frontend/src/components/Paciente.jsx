import usePacientes from "../../hooks/usePacientes.jsx";

function Paciente({paciente}) {

    const {email, fecha, nombre, propietario, sintomas, _id} = paciente

    const {setEdicion, eliminarPaciente} = usePacientes()
    const formatearFecha = (fecha) => {
        const nuevaFecha = new Date(fecha)
        return new Intl.DateTimeFormat("es-PE", {dateStyle: "long"}).format(nuevaFecha)
    }


    return (
        <div className={"mx-5 bg-white shadow-md px-7 py-7 rounded-xl"}>
            <p className={"font-bold uppercase text-indigo-700"}>Nombre:
                <span className={"font-normal normal-case text-black"}>  {nombre}</span>
            </p>
            <p className={"font-bold uppercase text-indigo-700"}>Propietario:
                <span className={"font-normal normal-case text-black"}> {propietario}</span>
            </p>
            <p className={"font-bold uppercase text-indigo-700"}>Email:
                <span className={"font-normal normal-case text-black"}> {email}</span>
            </p>
            <p className={"font-bold uppercase text-indigo-700"}>Fecha de Alta:
                <span className={"font-normal normal-case text-black"}> {formatearFecha(fecha)}</span>
            </p>
            <p className={"font-bold uppercase text-indigo-700"}>Sintomas:
                <span className={"font-normal normal-case text-black"}> {sintomas}</span>
            </p>

            <div className={"flex flex-col md:flex-row gap-5 justify-between mt-5"}>
                <button
                    type={"button"}
                    className={"py-2 px-10 bg-[var(--color-terciario)] hover:bg-cyan-700 text-white uppercase font-bold rounded-lg"}
                    onClick={() => setEdicion(paciente)}
                >
                    Editar
                </button>
                <button
                    type={"button"}
                    className={"py-2 px-10 bg-red-600 hover:bg-red-700 text-white uppercase font-bold rounded-lg"}
                    onClick={()=>eliminarPaciente(_id)}
                >
                    Eliminar
                </button>
            </div>

        </div>
    );
}

export default Paciente;