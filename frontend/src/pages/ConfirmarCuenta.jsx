import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import clienteAxios from "../config/axios.jsx";
import Alerta from "../components/Alerta.jsx";

function ConfirmarCuenta() {
    const [cuentaConfirmada, setCuentaConfirmada] = useState(false)
    const [cargando, setCargando] = useState(true)
    const [alerta, setAlerta] = useState({})

    const {token} = useParams()

    useEffect(() => {
        (async function (){
            try {
                const url = `/api/veterinarios/confirmar/${token}`
                const {data} = await clienteAxios(url)
                setCuentaConfirmada(true)
                setAlerta({
                    msg: data.msg,
                    error:false
                })
            } catch (error) {
                setAlerta({msg: error.response.data.msg, error: true})
            }
            setCargando(false)
        })()
    }, [])


    return (
        <main className={"container w-2/5 mx-auto mt-8"}>
            <div className={"mb-10"}>
                <h1 className={"text-indigo-600 text-center text-5xl font-black md:text-6xl"}>
                    Confirma tu cuenta y gestiona tus <span
                    className={"text-black"}>pacientes</span></h1>
            </div>
            <div className={"w-11/12 mx-auto shadow h-fit px-10 py-5 rounded-xl bg-white "}>
                {!cargando && <Alerta alerta={alerta}/>}
                <div className={"flex justify-center"}>
                    {cuentaConfirmada && (<Link to={"/"} className={"font-bold my-5 " +
                        "text-center bg-black text-white inline-block mx-auto p-3 rounded hover:bg-cyan-500 "}>
                        Iniciar sesión
                    </Link>)}
                </div>
            </div>
        </main>

    );
}

export default ConfirmarCuenta;