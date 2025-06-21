import Swal from 'sweetalert2/dist/sweetalert2.js'
import 'sweetalert2/dist/sweetalert2.css'

const mostrarConfirmacion = async ()=>{
    return await Swal.fire({
        title: "Espera..!",
        text: "¿Estas seguro de eliminar a este Paciente?",
        icon: "error",
        confirmButtonText: "Si",
        showDenyButton: true,
        denyButtonText: "No"
    })
}

export default mostrarConfirmacion