import {useContext} from "react";
import PacientesContext from "../context/PacientesProvider.jsx";

function usePacientes() {
    return (
        useContext(PacientesContext)
    );
}

export default usePacientes;