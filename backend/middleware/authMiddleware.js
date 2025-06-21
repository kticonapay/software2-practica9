import jwt from "jsonwebtoken";
import Veterinario from "../models/Veterinario.js";
const checkAuth = async (request, response, next) => {

    let token

    if (request.headers.authorization && request.headers.authorization.startsWith("Bearer")) {
        try {
            token = request.headers.authorization.substring(7)
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            request.veterinario = await Veterinario.findById(decoded.id).select("-password -token -confirmado")
        } catch (e) {
            const error = new Error("Token No válido")
            return response.status(403).json({
                msg: error.message
            })
        }
    }
    if (!token){
        const error = new Error("Token no válido o inexistente")
        return  response.status(403).json({
            msg: error.message
        })
    }
    next()
}

export default checkAuth