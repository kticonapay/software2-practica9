import AdminNav from "../components/AdminNav.jsx";
import useAuth from "../../hooks/useAuth.jsx";
import {useEffect, useState} from "react";
import Alerta from "../components/Alerta.jsx";
import Heading from "../components/Heading.jsx";

function EditarPerfil() {

    const {auth, actualizarPerfil} = useAuth()
    const [perfil, setPerfil] = useState({})
    const [alerta, setAlerta] = useState({})


    useEffect(() => {
        setPerfil(auth)
    }, [auth]);

    function handleSubmitActualizarPerfil(e){
        e.preventDefault()

        const { nombre, email} = perfil

        if (nombre.trim() === "" || email.trim() === ""){
            console.log("campos importantes vacios")
            setAlerta({msg: "Los campos (*) son obligatorios", error: true})
            return
        }
        actualizarPerfil(perfil)
            .then(respuesta => {
                setAlerta(respuesta)
                setPerfil({})
            })
    }

    return (
        <>
            <AdminNav/>
            <main className={"mt-5"}>
                <Heading titulo={"Editar Perfil"} subtitulo={"Modifica tu-Información aquí"}/>
                <div className={"flex justify-center"}>
                    <div className={"w-full md:w-1/2 bg-white shadow rounded-lg p-5"}>
                        {alerta.msg && <Alerta alerta={alerta}/>}
                        <form
                            className={"space-y-3"}
                            onSubmit={handleSubmitActualizarPerfil}
                        >
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Nombre (*) :</label>
                                <input
                                    type={"text"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"nombre"}
                                    value={perfil.nombre || ""}
                                    onChange={e=>{
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Web</label>
                                <input
                                    type={"text"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"web"}
                                    placeholder={"Añade tu sitio web"}
                                    value={perfil.web || ""}
                                    onChange={e=>{
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Teléfono</label>
                                <input
                                    type={"text"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"telefono"}
                                    placeholder={"Añade tu telefono"}
                                    value={perfil.telefono || ""}
                                    onChange={e=>{
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <div>
                                <label data-cy={"uppercase font-bold text-gray-600"}>Email (*) :</label>
                                <input
                                    type={"text"}
                                    className={"border bg-gray-50 w-full p-2 mt-5 rounded-lg"}
                                    name={"email"}
                                    value={perfil.email || ""}
                                    onChange={e=>{
                                        setPerfil({
                                            ...perfil,
                                            [e.target.name]: e.target.value
                                        })
                                    }}
                                />
                            </div>
                            <input
                                type={"submit"}
                                value={"Guardar Cambios"}
                                className={"bg-[var(--color-primario)] px-10 py-3 cursor-pointer font-bold text-white rounded-lg uppercase w-full mt-5"}
                            />
                        </form>
                    </div>
                </div>
            </main>
        </>
    );
}

export default EditarPerfil;