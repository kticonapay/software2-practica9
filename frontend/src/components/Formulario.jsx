import {useEffect, useState} from "react";
import Alerta from "./Alerta.jsx";
import usePacientes from "../../hooks/usePacientes.jsx";
import Heading from "./Heading.jsx";

function Formulario() {

    const [nombre, setNombre] = useState("")
    const [propietario, setPropietario] = useState("")
    const [email, setEmail] = useState("")
    const [fecha, setFecha] = useState("")
    const [sintomas, setSintomas] = useState("")
    const [id, setId] = useState(null)

    const [alerta, setAlerta] = useState({})
    const {paciente, guardarPaciente} = usePacientes()

    useEffect(() => {
        if (paciente?.nombre) {
            setNombre(paciente.nombre)
            setPropietario(paciente.propietario)
            setEmail(paciente.email)
            setFecha(formatearFechaAFormulario(paciente.fecha))
            setSintomas(paciente.sintomas)
            setId(paciente._id)
        }

    }, [paciente])

    function handleSubmitNuevoPaciente(e) {
        e.preventDefault()

        if ([nombre, propietario, email, fecha, sintomas].includes("")) {
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }
        guardarPaciente({
            nombre,
            propietario,
            email,
            fecha,
            sintomas,
            _id: id
        })

        setAlerta({})
        setNombre("")
        setPropietario("")
        setEmail("")
        setFecha("")
        setSintomas("")
        setId(null)
        e.target.reset()
    }

    const formatearFechaAFormulario = (fecha) => {
        return new Date(fecha).toISOString().slice(0, 10);
    }
    return (
        <>
            <Heading titulo={"Formulario"} subtitulo={"Añade tus-Pacientes y Administralos"}/>
            <form className={"space-y-3 p-8 bg-white shadow-md rounded-md"}
                  onSubmit={handleSubmitNuevoPaciente}
            >
                {alerta.msg && <Alerta alerta={alerta}/>}
                <div className={"flex gap-5"}>
                    <div>
                        <label htmlFor={"nombre"} className={"text-gray-700 uppercase font-bold"}>Mascota</label>
                        <input
                            id={"nombre"}
                            type={"text"}
                            placeholder={"Nombre de la mascota"}
                            className={"border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-md"}
                            value={nombre}
                            onChange={e => setNombre(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor={"propietario"}
                               className={"text-gray-700 uppercase font-bold"}>Propietario</label>
                        <input
                            id={"propietario"}
                            type={"text"}
                            placeholder={"Nombre del propietario"}
                            className={"border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-md"}
                            value={propietario}
                            onChange={e => setPropietario(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor={"email"} className={"text-gray-700 uppercase font-bold"}>Email</label>
                    <input
                        id={"email"}
                        type={"email"}
                        placeholder={"Email del propietario"}
                        className={"border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-md"}
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor={"fecha"} className={"text-gray-700 uppercase font-bold"}>Fecha</label>
                    <input
                        id={"fecha"}
                        type={"date"}
                        placeholder={"Fecha de alta"}
                        className={"border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-md"}
                        value={fecha}
                        onChange={e => setFecha(e.target.value)}
                    />
                </div>
                <div>
                <label htmlFor={"sintomas"} className={"text-gray-700 uppercase font-bold"}>Sintomas</label>
                    <textarea
                        id={"sintomas"}
                        placeholder={"Sintomas del paciente"}
                        className={"border-2 w-full p-3 mt-2 placeholder-gray-400 rounded-md"}
                        value={sintomas}
                        onChange={e => setSintomas(e.target.value)}
                    />
                </div>
                <input
                    type={"submit"}
                    value={id ? "Actualizar Paciente" : "Agregar Paciente"}
                    className={"bg-[var(--color-primario)]  w-full p-3 text-white uppercase font-bold hpver:bg-indigo-700 cursor-pointer"}
                />
            </form>
        </>
    );
}

export default Formulario;