import {createContext, useEffect, useState} from "react";
import clienteAxios from "../src/config/axios.jsx";
import mostrarConfirmacion from "../src/helpers/mostrarConfirmacion.js";
import useAuth from "../hooks/useAuth.jsx";

const PacientesContext = createContext()

export function PacientesProvider({children}) {

    const [pacientes, setPacientes] = useState([])
    const [paciente, setPaciente] = useState({})
    const {auth} = useAuth()
    useEffect(() => {
        (async function (){
                const token = localStorage.getItem("token")
                if (!token) return
                try {
                    const {data} = await clienteAxios("/api/pacientes", {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                    setPacientes(data.pacientes)
                } catch (error) {
                    console.log(error)
                }
        })()
    }, [auth])

    const guardarPaciente = async (paciente) => {
        const token = localStorage.getItem("token")
        const config = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        console.log(paciente)
        if (paciente._id){
            await clienteAxios.put(`/api/pacientes/${paciente._id}`, paciente, config)
            setPacientes(pacientes.map(p=>{
                if (p._id === paciente._id){
                    return paciente
                }
                return p
            }))
        }else{
            delete paciente._id
            try {
                const {data} = await clienteAxios.post("/api/pacientes/", paciente, config)
                const {createdAt, updatedAt, __v, ...pacienteAlmacenado} = data.paciente
                setPacientes([...pacientes, pacienteAlmacenado])
            } catch (error) {
                console.log(error.response.data.msg)
            }
        }
    }
    
    const setEdicion = (paciente)=>{
        console.log("paciente desde edicion:")
        console.log(paciente)
        setPaciente(paciente)
    }

    const eliminarPaciente = async (id)=>{
        const respuesta = await mostrarConfirmacion()
        if (respuesta.isConfirmed){
            const token = localStorage.getItem("token")
            const config = {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
            try{
                await clienteAxios.delete(`/api/pacientes/${id}`,config)
                setPacientes(pacientes.filter(p=>p._id !== id))
            }catch (error){
                console.log(error.response.data.msg)
            }
        }
    }
    return (
        <PacientesContext.Provider value={{
            pacientes,
            guardarPaciente,
            setEdicion,
            paciente,
            eliminarPaciente,
        }}>
            {children}
        </PacientesContext.Provider>
    );
}

export default PacientesContext;