import Categoria from "../models/Categoria.js";

const crearCategoria = async (req, res) => {
    const { nombre } = req.body;
    if (nombre){
        let categoria = await Categoria.findOne({ nombre});
        if(categoria) {
            return res.status(400).json({msg: 'La categoria ya existe'});
        }
        categoria = new Categoria(req.body);
        try{
            await categoria.save()
        }catch (error) {
            res.status(500).send('Hubo un error al crear la categoria');
        }

        res.json(categoria);
    }else{
        res.status(400).json({msg: 'El nombre de la categoria es obligatorio'});
    }
}

const obtenerCategorias = async (req, res) => {
    try {
        const categorias = await Categoria.find();
        res.status(200).json(categorias);
    } catch (error) {
        res.status(500).send('Hubo un error al obtener las categorias');
    }
}

export {
    crearCategoria,
    obtenerCategorias
}