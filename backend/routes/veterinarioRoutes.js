import express from "express";
import checkAuth from "../middleware/authMiddleware.js";
import {
    registrar,
    perfil,
    confirmar,
    autenticar,
    olvidePassword,
    comprobarToken,
    nuevoPassword,
    actualizarPerfil,
    actualizarPassword
} from "../controllers/veterinarioController.js";

const router = express.Router()

// endpoints publicos:

router.post("/", registrar)
router.get("/confirmar/:token", confirmar)
router.post("/login", autenticar)
router.post("/olvide-password", olvidePassword)
router.route("/olvide-password/:token").get(comprobarToken).post(nuevoPassword)
/* Esto es equivalente a:
router.get("/olvide-password/:token", comprobarToken)
router.post("/olvide-password/:token", nuevoPassword) */

// endpoints privados:

router.get("/perfil", checkAuth, perfil)
router.put("/perfil/:id", checkAuth, actualizarPerfil)
router.patch("/actualizar-password", checkAuth, actualizarPassword)

export default router