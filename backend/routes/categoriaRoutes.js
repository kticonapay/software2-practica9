import express from "express";
import {
    crearCategoria,
    obtenerCategorias
}from "../controllers/categoriaController.js";
import checkAuth from "../middleware/authMiddleware.js";


const router = express.Router()
router.use(checkAuth)

router.route("/")
    .post(crearCategoria)
    .get(obtenerCategorias)

export default router