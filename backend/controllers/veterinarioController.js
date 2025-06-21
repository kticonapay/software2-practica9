import Veterinario from "../models/Veterinario.js";
import generarJWT from "../helpers/generarJWT.js";
import generarID from "../helpers/generarID.js";
import emailRegistro from "../helpers/emailRegistro.js";
import emailRecuperarPassword from "../helpers/emailRecuperarPassword.js";

const registrar = async (req, resp) => {
    try {
        const veterinario = new Veterinario(req.body)
        const veterinarioGuardado = await veterinario.save()


        try {
            await emailRegistro({
                email: veterinarioGuardado.email,
                nombre: veterinarioGuardado.nombre,
                token: veterinarioGuardado.token
            })
            resp.json({
                msg: "Veterinario almacenado exitósamente",
                nombre: veterinarioGuardado.nombre,
                correo: veterinarioGuardado.email
            })
        } catch (errorMailTrap) {
            resp.status(500).json({
                msg: "Error al enviar email",
            })
        }
    } catch (error) {
        resp.status(400).json({
            msg: "Usuario ya registrado",
        })
    }
}


const perfil = (req, resp) => {

    resp.json({
        veterinario: req.veterinario
    })
}
const confirmar = async (req, resp) => {

    const veterinarioEncontrado = await Veterinario.findOne({token: req.params.token})

    if (!veterinarioEncontrado) {
        const error = new Error("Token no válido")

        resp.status(404).json({
            msg: error.message
        })
        return
    }

    try {
        veterinarioEncontrado.token = null
        veterinarioEncontrado.confirmado = true

        await veterinarioEncontrado.save()

        resp.json({
            msg: "Usuario confirmado",
            nombre: veterinarioEncontrado.nombre
        })
    } catch (error) {
        console.log(error)
    }

}

const autenticar = async (req, resp) => {

    const {email, password} = req.body

    const vet = await Veterinario.findOne({email})

    if (!vet) {
        const error = new Error("Veterinario inexistente")
        return resp.status(404).json({
            msg: error.message
        })
    }

    // Comprobamos si el usuario esta confirmado

    if (!vet.confirmado) {
        const error = new Error("Veterinario No confirmado")
        return resp.status(403).json({
            msg: error.message
        })
    }

    // Autenticamos

    if (!await vet.comprobarPassword(password)) {
        const error = new Error("Usuario y/o Contraseña no válidos")
        return resp.status(401).json({
            msg: error.message
        })
    }

    resp.status(200).json({
        vet: {
            _id: vet._id,
            nombre: vet.nombre,
            email: vet.email,
            telefono: vet.telefono,
            web: vet.web
        },
        token: generarJWT(vet.id)
    })
}

const olvidePassword = async (req, resp) => {
    const {email} = req.body

    const existe = await Veterinario.findOne({email})

    if (!existe) {
        const error = new Error("El veterinario no existe")
        return resp.json({
            msg: error.message
        })
    }

    try {
        existe.token = generarID()
        await existe.save()
        try {
            await emailRecuperarPassword({
                nombre: existe.nombre,
                email,
                token: existe.token
            })
        } catch (errorMailTrap) {
            return resp.status(500).json({
                msg: "Error al enviar email",
            })
        }
        resp.json({
            msg: "Hemos enviado un email con las instrucciones"
        })
    } catch (error) {
        resp.json({
            msg: "Error al generar nuevo token"
        })
    }
}
const comprobarToken = async (req, resp) => {
    const {token} = req.params

    const tokenValido = await Veterinario.findOne({token})

    if (tokenValido) {
        resp.json({
            msg: "Token Valido, el veterinario existe"
        })
    } else {
        const error = new Error("Token no valido")
        resp.json({
            msg: error.message
        })
    }
}
const nuevoPassword = async (req, resp) => {
    const {token} = req.params
    const {password} = req.body

    const veterinario = await Veterinario.findOne({token})

    if (!veterinario) {
        const error = new Error("Token no válido")
        return resp.status(400).json({
            msg: error.message
        })
    }

    try {
        veterinario.token = null
        veterinario.password = password

        await veterinario.save()
        resp.json({msg: "El Password se actualizo correctamente"})
    } catch (e) {
        resp.json({msg: "No se pudo actualizar el password"})
    }
}

const actualizarPerfil = async (req, resp) => {
    const id = req.params.id
    const {nombre, email, web, telefono} = req.body

    let vet

    try {
        vet = await Veterinario.findById(id)
    } catch (e) {
        const error = new Error("Hubo un error al encontrar al veterinario")
        resp.status(404).json({
            msg: error.message
        })
    }

    try {
        vet.nombre = nombre
        vet.email = email
        vet.web = web
        vet.telefono = telefono

        await vet.save()

        resp.status(200).json({
            msg: "Perfil actualizado exitósamente"
        })
    } catch (e) {
        const error = new Error("Error al actualizar el Perfil")
        resp.status(500).json({
            msg: error.message
        })
    }

}

const actualizarPassword = async (req, resp) => {

    const id = req.veterinario
    const {actualPassword, nuevoPassword} = req.body

    console.log(actualPassword)
    console.log(nuevoPassword)

    let vet

    try {
        vet = await Veterinario.findById(id)
    } catch (e) {
        const error = new Error("ID inexistente")
        return resp.status(404).json({
            msg: error.message
        })
    }


    if (! await vet.comprobarPassword(actualPassword)){
        const error = new Error("Contraseña Actual Incorrecta")
        return  resp.status(403).json({
            msg: error.message
        })
    }

    vet.password = nuevoPassword
    resp.status(200).json({
        msg: "Contraseña Actualizada exitósamente"
    })
    await vet.save()
}

export {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
}