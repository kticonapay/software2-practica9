import Paciente from "../models/Paciente.js";

const agregarPaciente = async (req, resp) => {
    let paciente = new Paciente(req.body)
    try {
        paciente.veterinario = req.veterinario.id
        paciente = await paciente.save()
        resp.json({
            paciente
        })
    } catch (e) {
        console.log(e)
    }
}

const obtenerPacientes = async (req, resp) => {

    const veterinario = req.veterinario.id

    try {
        const pacientes = await Paciente.find({veterinario}).select("-veterinario -createdAt -updatedAt -__v")

        resp.status(200).json({
            pacientes
        })
    } catch (e) {
        console.log(e)
    }
}

const obtenerPaciente = async (req, resp) => {

    let paciente

    try{
        paciente = await Paciente.findById(req.params.id)
    }catch (err){
        return resp.json({msg:"Paciente No encontrado"})
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return resp.json({msg:"Accion no válida"})
    }

    resp.status(200).json(paciente)

}

const actualizarPaciente = async (req, resp) => {
    const id = req.params.id
    const nuevoPaciente = req.body

    let paciente

    try{
        paciente = await Paciente.findById(id)
    }catch (err){
        return resp.json({msg:"Paciente No encontrado"})
    }
    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return resp.json({msg:"Accion no válida"})
    }

    try {
        await Paciente.updateOne({_id: id}, nuevoPaciente)
        resp.status(200).json({msg: "Paciente Actualizado Correctamente"})
    } catch (e) {
        const error = new Error("No se pudo actualizar al paciente")
        resp.status(500).json({msg: error.message})
    }
}

const eliminarPaciente = async (req, resp) => {
    const id = req.params.id
    let paciente

    try{
        paciente = await Paciente.findById(id)
    }catch (err){
        return resp.json({msg:"Paciente No encontrado"})
    }

    if (paciente.veterinario._id.toString() !== req.veterinario._id.toString()){
        return resp.json({msg:"Accion no válida"})
    }

    try {
        await paciente.deleteOne()
        resp.status(200).json({
            msg:"Paciente eliminado correctamente"
        })
    } catch (e) {
        const error = new Error("No se pudo eliminar al paciente")
        resp.status(500).json({msg: error.message})
    }
}

export {
    agregarPaciente,
    obtenerPacientes,
    obtenerPaciente,
    actualizarPaciente,
    eliminarPaciente
}