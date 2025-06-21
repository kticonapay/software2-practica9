import {Link, useParams} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import {useState} from "react";
import clienteAxios from "../config/axios.jsx";

function NuevoPassword() {
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")
    const [iniciarSesion, setIniciarSesion] = useState(false)
    const [alerta, setAlerta] = useState({})

    const {token} = useParams()


    async function handleSubmitNuevoPassword(e) {
        e.preventDefault()
        if ([password, repetirPassword].includes("")) {
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }

        if (password.length < 6) {
            setAlerta({msg: "La contraseña es muy corta, minimo 6 caracteres", error: true})
            return;
        }
        if (password !== repetirPassword) {
            setAlerta({msg: "Las contraseñas no son iguales", error: true})
            return;
        }
        try {
            const url = `/api/veterinarios/olvide-password/${token}`
            const response = await clienteAxios.post(url, {password})
            setIniciarSesion(true)
            setAlerta({msg: response.data.msg, error: false})
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }


    return (
        <>
            <div>
                <h1 className={"text-indigo-600 text-center text-5xl font-black md:text-6xl"}>
                    Actualiza tus <span
                    className={"text-black block"}>Datos</span></h1>
            </div>
            <div className={"w-11/12 shadow text-sm px-10 py-5 rounded-xl bg-white"}>
                {alerta.msg && <Alerta alerta={alerta}/>}
                <form
                    className={"space-y-3 mt-5"}
                    onSubmit={handleSubmitNuevoPassword}
                >
                    <div>
                        <label htmlFor={"contraseña"}
                               className={"uppercase text-gray-600 block  font-bold"}
                        >Contraseña:
                        </label>
                        <input id={"contraseña"} type={"password"} placeholder={"Tu Contraseña"}
                               className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                               value={password}
                               onChange={e => setPassword(e.target.value)}
                        />
                    </div>
                    <div>
                        <label htmlFor={"rep_contraseña"}
                               className={"uppercase text-gray-600 block font-bold"}
                        >Repite Contraseña:
                        </label>
                        <input id={"rep_contraseña"} type={"password"} placeholder={"Repite Contraseña"}
                               className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                               value={repetirPassword}
                               onChange={e => setRepetirPassword(e.target.value)}
                        />
                    </div>
                    {iniciarSesion ?
                        <Link to={"/"} className={"font-bold my-5 " +
                            "text-center bg-black text-white inline-block mx-auto p-3 rounded hover:bg-cyan-500 "}>
                            Iniciar sesión
                        </Link>:
                        <input type={"submit"}
                                         className={"bg-indigo-700 w-full py-2 px-10 rounded-xl text-white uppercase font-bold " +
                                             "hover:cursor-pointer hover:bg-indigo-600 !mt-5"}
                                         value={"Actualizar"}
                        />
                    }
                </form>
            </div>
        </>
    )
        ;
}

export default NuevoPassword;