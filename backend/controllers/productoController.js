import Producto from "../models/Producto.js";
import * as fs from "fs";

const agregarProducto = async (req, resp) => {
    try {
        const nuevoProducto = new Producto({
            ...req.body,
            imagen: req.file.filename
        });
        await nuevoProducto.save();
        resp.status(200).json({msg: 'Producto agregado correctamente'});
    } catch (error) {
        resp.status(500).json({msg: 'Error al agregar un producto'});
    }
}

const eliminarProducto = async (req, resp) => {
    const id = req.params.id;
    try {
        const producto = await Producto.findById(id)
        try {
            await producto.deleteOne()
            const path = `./uploads/${producto.imagen}`;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                    return resp.status(500).json({msg: 'Error al eliminar la imagen del producto'});
                }
                resp.status(200).json({msg: 'Producto eliminado correctamente'});
            });
        } catch (error) {
            resp.status(500).json({msg: 'Error al eliminar un producto'});
        }
    } catch (error) {
        resp.status(404).json({msg: 'Producto inexistente'});
    }
}

const actualizarProducto = async (req, resp) => {
    const id = req.params.id;
    const file = req.file
    const nuevoProducto = req.body;
    try {
        const producto = await Producto.findById(id);
        if (producto) {
            const path = `./uploads/${producto.imagen}`;
            fs.unlink(path, (err) => {
                if (err) {
                    console.error(err);
                    return resp.status(500).json({msg: 'Error al eliminar la imagen del producto antiguo'});
                }
            });
        }
        producto.nombre = nuevoProducto.nombre
        producto.precio = nuevoProducto.precio
        producto.descripcion = nuevoProducto.descripcion
        producto.imagen = file.filename
        producto.categoria = nuevoProducto.categoria
        producto.tipoMascota = nuevoProducto.tipoMascota
        try {
            await producto.save()
        } catch (error) {
            return resp.status(500).json({msg: 'Error al actualizar un producto'});
        }
        try {
            producto.updateOne({_id: id}, nuevoProducto)
            resp.status(200).json({msg: 'Producto actualizado correctamente'});
        } catch (error) {
            resp.status(500).json({msg: 'Error al actualizar un producto'});
        }
    } catch (error) {
        resp.status(404).json({msg: 'Producto inexistente'});
    }
}

const obtenerProductos = async (req, resp) => {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 6;
    const inicioIndice = (pagina - 1) * limite;
    let total
    try {
        total = await Producto.countDocuments();
    } catch (error) {
        resp.status(500).json({msg: 'Error al contar los productos'});
    }

    try {
        const productos = await Producto.find().populate('categoria')
            .skip(inicioIndice).limit(limite);

        resp.status(200).json({
            pagina,
            limite,
            inicioIndice,
            total,
            paginas: Math.ceil(total / limite),
            productos: productos
        })
    } catch (error) {
        resp.status(500).json({msg: 'Error al obtener los productos'});
    }
}
const obtenerProductosFiltrados = async (req, resp) => {
    const pagina = parseInt(req.query.pagina) || 1;
    const limite = parseInt(req.query.limite) || 6;
    const {nombre, categoria, tipoMascota} = req.body
    const inicioIndice = (pagina - 1) * limite;
    let total
    try {
        const regex = new RegExp(nombre, 'i');
        const filtro = {}

        if(nombre){
            filtro.nombre = {$regex: regex}
        }
        if(categoria){
            filtro.categoria = categoria
        }
        if (tipoMascota){
            filtro.tipoMascota = tipoMascota
        }
        try {
            total = await Producto.countDocuments(filtro);
        } catch (error) {
            resp.status(500).json({msg: 'Error al contar los productos filtrados'});
        }
        const productos = await Producto.find(filtro)
            .populate('categoria')
            .skip(inicioIndice).limit(limite);
        resp.status(200).json({
            pagina,
            limite,
            inicioIndice,
            total,
            paginas: Math.ceil(total / limite),
            productos: productos
        })
    } catch (error) {
        resp.status(500).json({msg: 'Error al obtener los productos filtrados'});
    }
}

export {
    agregarProducto,
    eliminarProducto,
    actualizarProducto,
    obtenerProductos,
    obtenerProductosFiltrados
}
