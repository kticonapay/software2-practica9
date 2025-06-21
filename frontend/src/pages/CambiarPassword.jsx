import AdminNav from "../components/AdminNav.jsx";
import Alerta from "../components/Alerta.jsx";
import {useState} from "react";
import useAuth from "../../hooks/useAuth.jsx";
import Heading from "../components/Heading.jsx";

function CambiarPassword() {

    const [alerta, setAlerta] = useState({})
    const [password, setPassword] = useState()

    const {actualizarPassword} = useAuth()

    function handleSubmitActualizarPass(e) {
        e.preventDefault()

        if (Object.values(password).includes("")) {
            setAlerta({msg: "Los campos (*) son obligatorios", error: true})
            return
        }

        if (password.pwd_nuevo.length < 6) {
            setAlerta({msg: "La contraseña es muy corta, minimo 6 caracteres", error: true})
            return;
        }
        if (password.pwd_nuevo !== password.pwd_confirmar) {
            setAlerta({msg: "Las contraseñas no son iguales", error: true})
            return;
        }

        actualizarPassword({
            actualPassword: password.pwd_actual,
            nuevoPassword: password.pwd_nuevo
        })
            .then(respuesta => {
                setAlerta(respuesta)
                e.target.reset()
            })
    }

    return (
        <>
            <AdminNav/>
            <main className={"mt-5"}>

                <Heading titulo={"Cambiar Password"} subtitulo={"Modifica tu-Password aquí"}/>

                <div className={"flex justify-center"}>
                    <div className={"w-full md:w-1/2 bg-white shadow rounded-lg p-5"}>
                        {alerta.msg && <Alerta alerta={alerta}/>}
                        <form
                            className={"space-y-5"}
                            onSubmit={handleSubmitActualizarPass}
                        >
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Contraseña Actual (*) :</label>
                                <input
                                    type={"password"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"pwd_actual"}
                                    onBlur={e => setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Nueva Contraseña (*) :</label>
                                <input
                                    type={"password"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"pwd_nuevo"}
                                    onBlur={e => setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Confirmar Contraseña (*) :</label>
                                <input
                                    type={"password"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"pwd_confirmar"}
                                    onBlur={e => setPassword({
                                        ...password,
                                        [e.target.name]: e.target.value
                                    })}
                                />
                            </div>
                            <input
                                type={"submit"}
                                value={"Guardar Cambios"}
                                className={"bg-[var(--color-primario)] px-10 cursor-pointer py-3 font-bold text-white rounded-lg uppercase w-full mt-5"}
                            />
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default CambiarPassword;