import {BrowserRouter, Routes, Route} from "react-router-dom";
import AuthLayout from "./layout/AuthLayout.jsx";
import Registrar from "./pages/Registrar.jsx";
import ConfirmarCuenta from "./pages/ConfirmarCuenta.jsx";
import OlvidePassword from "./pages/OlvidePassword.jsx";
import Login from "./pages/Login.jsx";
import "./index.css"
import "../src/styles/custom.css"
import NuevoPassword from "./pages/NuevoPassword.jsx";
import {AuthProvider} from "../context/AuthProvider.jsx";
import RutaProtegida from "./layout/RutaProtegida.jsx";
import AdministrarPacientes from "./pages/AdministrarPacientes.jsx";
import {PacientesProvider} from "../context/PacientesProvider.jsx";
import EditarPerfil from "./pages/EditarPerfil.jsx";
import CambiarPassword from "./pages/CambiarPassword.jsx";
import {Tienda} from "./pages/Tienda.jsx";
import Productos from "./pages/Productos.jsx";

function App() {
    return (
        <BrowserRouter>
            <AuthProvider>
                <PacientesProvider>
                    <Routes>
                        <Route path={"/"} element={<AuthLayout/>}>
                            <Route index element={<Login/>}/>
                            <Route path={"/registrar"} element={<Registrar/>}/>
                            <Route path={"/olvide-password"} element={<OlvidePassword/>}/>
                            <Route path={"/olvide-password/:token"} element={<NuevoPassword/>}/>
                        </Route>

                        <Route path={"/confirmar-cuenta/:token"} element={<ConfirmarCuenta/>}/>

                        <Route path={"/admin"} element={<RutaProtegida/>}>
                            <Route index element={<AdministrarPacientes/>}/>
                            <Route path={"perfil"} element={<EditarPerfil/>}/>
                            <Route path={"cambiar-password"} element={<CambiarPassword/>}/>
                            <Route path={"productos"} element={<Productos/>}/>
                        </Route>
                        <Route index path={'/tienda'}
                               element={<Tienda/>}
                        />
                    </Routes>
                </PacientesProvider>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App
