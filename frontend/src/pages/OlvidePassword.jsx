import {Link, useParams} from "react-router-dom";
import {useState} from "react";
import Alerta from "../components/Alerta.jsx";
import alerta from "../components/Alerta.jsx";
import clienteAxios from "../config/axios.jsx";

function OlvidePassword() {

    const [email, setEmail] = useState("")
    const [alerta, setAlerta] = useState({})
    async function handleSubmitOlvidePassword(e) {
        e.preventDefault()

        if (email === "") {
            setAlerta({msg: "Email Obligatorio", error: true})
            return
        }

        const url = "/api/veterinarios/olvide-password"

        try{
            const response = await clienteAxios.post(url, {email})
            setAlerta({msg: response.data.msg, error: false})
        }catch (error){
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    return (
        <>
            <div className={"w-11/12 shadow  px-10 py-7 text-sm rounded-xl bg-white"}>
                {alerta.msg && <Alerta alerta={alerta}/>}
                <form className={"space-y-3 mt-5"}
                      onSubmit={handleSubmitOlvidePassword}
                >
                    <div>
                        <label htmlFor={"email"}
                               className={"uppercase text-gray-600 block font-bold"}
                        >Email:
                        </label>
                        <input id={"email"} type={"email"} placeholder={"Email de Registro"}
                               className={"border w-full p-3 mt-3 bg-gray-50 rounded-xl"}
                               onChange={e => setEmail(e.target.value)}
                        />
                    </div>
                    <input type={"submit"}
                           className={"bg-[var(--color-terciario)]  w-full py-2 rounded-xl text-white uppercase font-bold " +
                               "hover:cursor-pointer hover:bg-[var(--color-secundario)]  !mt-5"}
                           value={"Enviar Instrucciones"}
                    />
                </form>
                <nav className={"mt-5 flex flex-col gap-5 justify-center text-center"}>
                    <Link to={"/"} className={"text-gray-600 "}>¿Ya tienes una Cuenta?
                        <span className={"registrate ml-5 font-bold"}>Inicia Sesión</span>
                    </Link>
                </nav>
            </div>
            <div>
                <h1 className={"text-[var(--color-primario)]  text-center text-5xl font-black md:text-6xl"}>
                    Olvide mi <span
                    className={"text-black"}>Contraseña</span></h1>
                <img src={"/min_img/perritoTriste.png"}
                     className={"w-3/5 mx-auto"}
                     alt={"golden-perro"}/>
            </div>
        </>
    );
}

export default OlvidePassword;