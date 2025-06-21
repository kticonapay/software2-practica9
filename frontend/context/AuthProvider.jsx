import {useState, useEffect, createContext} from "react";
import clienteAxios from "../src/config/axios.jsx";
import usePacientes from "../hooks/usePacientes.jsx";

const AuthContext = createContext()

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState({})
    useEffect(() => {
        (async function () {
            const token = localStorage.getItem("token")

            if (!token) {
                return
            }

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`
                }
            }

            try {
                const {data} = await clienteAxios("/api/veterinarios/perfil", config)
                setAuth(data.veterinario)
            } catch (error) {
                console.log(error.response.data.msg)
                setAuth({})
            }
        })()
    }, [])

    const actualizarPerfil = async (datos) => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clienteAxios.put(`/api/veterinarios/perfil/${datos._id}`,
                datos, config)
            setAuth(datos)
            return {
                error: false,
                msg: data.msg
            }
        } catch (error) {
            return {
                error: true,
                msg: error.response.data.msg
            }
        }
    }
    const cerrarSesion = () => {
        setAuth({})
        localStorage.removeItem("token")
    }

    const actualizarPassword = async (infoPassword) => {
        const token = localStorage.getItem("token")
        if (!token) {
            return
        }
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try{
            const {data} = await clienteAxios.patch(`/api/veterinarios/actualizar-password`,
                infoPassword, config)

            return { msg: data.msg, error: false}
        }catch (e){
            return { msg: e.response.data.msg, error: true}
        }
    }


    return (
        <AuthContext.Provider value={{
            auth,
            setAuth,
            cerrarSesion,
            actualizarPerfil,
            actualizarPassword
        }}>
            {children}
        </AuthContext.Provider>
    )
}
export {
    AuthProvider
}
export default AuthContext