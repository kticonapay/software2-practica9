import {Link} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

function Registrar() {

    const [nombre, setNombre] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [repetirPassword, setRepetirPassword] = useState("")

    const [alerta, setAlerta] = useState({})

    async function handleSubmit(e) {
        e.preventDefault()

        if ([nombre, email, password, repetirPassword].includes("")) {
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }
        if (password !== repetirPassword) {
            setAlerta({msg: "Las contraseñas no son iguales", error: true})
            return;
        }
        if (password.length < 6) {
            setAlerta({msg: "La contraseña es muy corta, minimo 6 caracteres", error: true})
            return;
        }
        try {
            const url = "/api/veterinarios"
            await clienteAxios.post(url, {
                nombre,
                email,
                password
            })

            setAlerta({msg: "Nuevo Usuario, confirma tu cuenta", error: false})
        } catch (e) {
            setAlerta({msg: e.response.data.msg, error: true})
        }
    }

    return (
        <>
            <div>
                <h1 className={"text-[var(--color-primario)]  text-center text-5xl font-black md:text-6xl"}>
                    Crea tu cuenta y Gestiona tus <span
                    className={"text-black"}>pacientes</span></h1>
            </div>
            <div className={"w-11/12 shadow text-sm px-10 py-5 rounded-xl bg-white"}>
                <form
                    className={"space-y-3 mt-5"}
                    onSubmit={handleSubmit}
                >
                    {alerta.msg && <Alerta
                        alerta={alerta}
                    />}
                    <div>
                        <label htmlFor={"nombre"}
                               className={"uppercase text-gray-600 block  font-bold"}
                        >Nombre:
                        </label>
                        <input id={"nombre"} type={"text"} placeholder={"Tu nombre"}
                               value={nombre}
                               onChange={e => setNombre(e.target.value)}
                               className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                        />
                    </div>
                    <div>
                        <label htmlFor={"email"}
                               className={"uppercase text-gray-600 block  font-bold"}
                        >Email:
                        </label>
                        <input id={"email"} type={"email"} placeholder={"Email de Registro"}
                               value={email}
                               onChange={e => setEmail(e.target.value)}
                               className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                        />
                    </div>
                    <div className={"flex flex-row  2xl:flex-row gap-5"}>
                        <div className={"basis-1/2"}>
                            <label htmlFor={"contraseña"}
                                   className={"uppercase text-gray-600 block  font-bold"}
                            >Contraseña:
                            </label>
                            <input id={"contraseña"} type={"password"} placeholder={"Tu Contraseña"}
                                   value={password}
                                   onChange={e => setPassword(e.target.value)}
                                   className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                            />
                        </div>
                        <div className={"basis-1/2"}>
                            <label htmlFor={"rep_contraseña"}
                                   className={"uppercase text-gray-600 block font-bold"}
                            >Repite Contraseña:
                            </label>
                            <input id={"rep_contraseña"} type={"password"} placeholder={"Repite Contraseña"}
                                   value={repetirPassword}
                                   onChange={e => setRepetirPassword(e.target.value)}
                                   className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                            />
                        </div>
                    </div>
                    <input type={"submit"}
                           className={"bg-[var(--color-terciario)]  w-full py-2 px-10 rounded-xl text-white uppercase font-bold " +
                               "hover:cursor-pointer hover:bg-[var(--color-secundario)] !mt-5"}
                           value={"Crear Cuenta"}
                    />
                </form>
                <nav className={"mt-5 flex flex-col gap-5 justify-center text-center"}>
                    <Link to={"/"} className={"text-gray-600"}>¿Ya tienes una Cuenta?
                        <span className={"registrate ml-5 font-bold"}>Inicia Sesión</span>
                    </Link>
                    <Link to={"/olvide-password"} className={"text-gray-600"}>Olvide mi
                        <span className={"text-indigo-600 font-bold"}> Password</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Registrar;