import {Navigate, Outlet} from "react-router-dom";
import Header from "../components/Header.jsx";
import Footer from "../components/Footer.jsx";
import useAuth from "../../hooks/useAuth.jsx";

function RutaProtegida() {

    const {auth} = useAuth()
    const token = localStorage.getItem("token")
    return (
        <div className={"min-h-screen relative pb-24"}>
                <Header/>
                <main className={"container mx-auto mt-8 mb-20"}>
                    {(auth?._id || token) ? <Outlet/> : <Navigate to={"/"}/>}
                </main>
                <Footer/>
        </div>
    );
}

export default RutaProtegida;