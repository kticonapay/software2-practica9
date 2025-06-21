import express from "express";
import {
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    obtenerProductos,
    obtenerProductosFiltrados

} from "../controllers/productoController.js";
import checkAuth from "../middleware/authMiddleware.js";
import multer from "multer";
import storage from "../config/multer.js";


const router = express.Router()
const uploader = multer({storage})

router.route("/")
    .get(obtenerProductos)

router.post("/filtrar", obtenerProductosFiltrados)

router.use(checkAuth)

router.route("/")
    .post(uploader.single('imagen'), agregarProducto)

router.route("/:id")
    .delete(eliminarProducto)
    .put(uploader.single('imagen'), actualizarProducto)



export default router