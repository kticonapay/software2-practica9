import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import Alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";
function Login() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [alerta, setAlerta] = useState({})

    const redirigir = useNavigate()
    const {setAuth} = useAuth()
    async function handleSubmitNuevoVeterinario(e){
        e.preventDefault()

        if ([email, password].includes("")) {
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }

        try{
            const url = "/api/veterinarios/login"
            const {data} = await clienteAxios.post(url, {
                email,
                password
            })
            localStorage.setItem("token", data.token)
            setAuth(data.vet)
            console.log("seteando desde login")

            redirigir("/admin")

        }catch (error){
            console.log(error)
            setAlerta({msg: error.response.data.msg, error: true})
        }

    }

    return (
        <>
            <div>
                <h1 className={"text-[var(--color-primario)]  text-5xl text-center font-black md:text-6xl"}>Inicia Sesión y Gestiona tus <span
                    className={"text-black"}>pacientes</span></h1>
                <img src={"min_img/goldenLogin.png"}
                     className={"w-3/5 mx-auto mt-5"}
                     alt={"golden-perro"}/>
            </div>
            <div className={"w-10/12 shadow  px-10 py-8 text-xs rounded-xl bg-white"}>
                <form className={"space-y-5 "}
                    onSubmit={handleSubmitNuevoVeterinario}
                >
                    <legend className={"text-[var(--color-primario)]  pointer-events-none font-bold text-3xl text-center"}>
                        Login
                    </legend>
                    {alerta.msg && <Alerta
                        alerta={alerta}
                    />}
                    <div>
                        <label htmlFor={"email"}
                               className={"uppercase text-gray-600 block  font-semibold"}
                        >Email:
                        </label>
                        <div className={"flex items-center justify-center gap-1 mt-3"}>
                            <div className={"bg-cyan-100 p-1 rounded-xl"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user"
                                     width="33"
                                     height="33" viewBox="0 0 24 24" strokeWidth="1.3" stroke="#00abfb" fill="none"
                                     strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                                </svg>
                            </div>
                            <input id={"email"} type={"email"} placeholder={"Email de Registro"}

                                   className={"outline-indigo-300 w-full py-2 px-3 bg-gray-50 rounded-xl"}
                                   onChange={e => setEmail(e.target.value)}

                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor={"password"}
                               className={"uppercase text-gray-600 block  font-semibold"}
                        >Contraseña:
                        </label>
                        <div className={"flex items-center justify-center gap-1 mt-3"}>
                            <div className={"bg-cyan-100 p-1 rounded-xl"}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-lock"
                                     width="33" height="33" viewBox="0 0 24 24" strokeWidth="1.3" stroke="#00abfb"
                                     fill="none" strokeLinecap="round" strokeLinejoin="round">
                                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                                    <path
                                        d="M5 13a2 2 0 0 1 2 -2h10a2 2 0 0 1 2 2v6a2 2 0 0 1 -2 2h-10a2 2 0 0 1 -2 -2v-6z"/>
                                    <path d="M11 16a1 1 0 1 0 2 0a1 1 0 0 0 -2 0"/>
                                    <path d="M8 11v-4a4 4 0 1 1 8 0v4"/>
                                </svg>
                            </div>
                            <input id={"password"} type={"password"} placeholder={"Tu Contraseña"}
                                   className={"outline-indigo-300 w-full py-2 px-3 bg-gray-50 rounded-xl"}
                                   onChange={e => setPassword(e.target.value)}
                            />
                        </div>

                    </div>
                    <input type={"submit"}
                           className={"bg-[var(--color-terciario)]   py-2 px-8 rounded-xl  text-white uppercase font-bold " +
                               "hover:cursor-pointer mx-auto block hover:bg-[var(--color-secundario)]  !mt-5"}
                           value={"Ingresar"}
                    />
                </form>
                <nav className={"mt-5 flex flex-col gap-5  justify-center text-center"}>
                    <Link to={"/registrar"} className={"text-gray-600  "}>¿No tienes una Cuenta?
                        <span className={"registrate block font-bold"}>Registrate</span>
                    </Link>
                    <Link to={"/olvide-password"} className={"text-gray-600  "}>Olvide mi
                        <span className={"text-indigo-600 font-bold"}> Password</span>
                    </Link>
                </nav>
            </div>
        </>
    );
}

export default Login;