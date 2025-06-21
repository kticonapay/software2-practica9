import {Link} from "react-router-dom";
import useAuth from "../../hooks/useAuth.jsx";

function Header() {
    const {cerrarSesion} = useAuth()

    function handleClickCerrarSesion() {
        cerrarSesion()
    }

    return (
        <header className={"py-10 bg-[var(--color-secundario)] "}>
            <div
                className={"mx-auto container flex flex-col font-bold gap-10 md:flex-row justify-between items-center"}>
                <Link to={"/admin"}>
                    <h1 className={"text-center text-2xl text-gray-200 leading-10 lg:leading-normal"}>
                        🐶 <br className={"lg:hidden"}/> ESIS <br className={"lg:hidden"}/>Administrador de <br className={"lg:hidden"}/>
                        <span className={"text-white"}> Pacientes de  <br className={"lg:hidden"}/>Veterinaria</span>
                    </h1>
                </Link>
                <nav className={"flex flex-col items-center text-white text-center  md:flex-row gap-y-6 gap-x-10"}>
                    <Link to={"/admin/perfil"} className={"hover:scale-125 duration-300 flex items-center gap-x-1.5"}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-user" width="20"
                             height="20" viewBox="0 0 24 24" strokeWidth="3" stroke="#ffffff" fill="none"
                             strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                            <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0"/>
                            <path d="M6 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2"/>
                        </svg>
                        Mi Perfil
                    </Link>
                    <Link to={"/admin/productos"} className={"hover:scale-125 duration-300 flex items-center gap-x-1.5"}>
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M11 5h2"></path>
                            <path d="M19 12c-.667 5.333 -2.333 8 -5 8h-4c-2.667 0 -4.333 -2.667 -5 -8"></path>
                            <path d="M11 16c0 .667 .333 1 1 1s1 -.333 1 -1h-2z"></path>
                            <path d="M12 18v2"></path>
                            <path d="M10 11v.01"></path>
                            <path d="M14 11v.01"></path>
                            <path
                                d="M5 4l6 .97l-6.238 6.688a1.021 1.021 0 0 1 -1.41 .111a.953 .953 0 0 1 -.327 -.954l1.975 -6.815z"></path>
                            <path
                                d="M19 4l-6 .97l6.238 6.688c.358 .408 .989 .458 1.41 .111a.953 .953 0 0 0 .327 -.954l-1.975 -6.815z"></path>
                        </svg>
                        Gestionar Tienda
                    </Link>
                    <button
                        type={"button"}
                        className={"flex gap-x-3 items-center"}
                        onClick={handleClickCerrarSesion}
                    >
                        <svg xmlns="http://www.w3.org/2000/svg"
                             viewBox="0 0 24 24" fill="none" stroke="currentColor"
                             strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                            <path d="M13 12v.01"></path>
                            <path d="M3 21h18"></path>
                            <path d="M5 21v-16a2 2 0 0 1 2 -2h7.5m2.5 10.5v7.5"></path>
                            <path d="M14 7h7m-3 -3l3 3l-3 3"></path>
                        </svg>
                        Cerrar Sesión
                    </button>
                </nav>
            </div>
        </header>
    );
}

export default Header;