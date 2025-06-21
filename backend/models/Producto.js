import mongoose, {Schema} from "mongoose";

const productoSchema = new Schema({
        nombre: {
            type: String,
            required: true,
        },
        precio: {
            type: Number,
            required: true
        },
        descripcion: {
            type: String,
            required: true
        },
        imagen: {
            type: String,
            required: true
        },
        categoria: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Categoria",
        },
        tipoMascota: {
            type: String,
            enum: ["PERRO", "GATO", "AMBOS"],
            required: true
        }
    },
    {
        timestamps: true
    })


const Producto = mongoose.model("Producto", productoSchema)

export default Producto