import express from "express"
import dotenv from "dotenv"
import conectarDB from "./config/db.js";
import veterinarioRoutes from "./routes/veterinarioRoutes.js";
import pacienteRoutes from "./routes/pacienteRoutes.js";
import cors from "cors"
import productoRoutes from "./routes/productoRoutes.js";
import categoriaRoutes from "./routes/categoriaRoutes.js";
import * as path from "path";
import { fileURLToPath } from 'url';

const app = new express()
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config()

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = process.env.PORT || 4000

const dominiosPermitidos = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback){
        if (true){
                callback(null,true)
        }else{
            callback(new Error("No permitido por CORS"))
        }
    }
}

app.use(cors(corsOptions))
conectarDB().then(()=>{
    app.use(express.json())
    app.use("/api/veterinarios/", veterinarioRoutes)
    app.use("/api/pacientes/", pacienteRoutes)
    app.use("/api/productos/", productoRoutes)
    app.use("/api/categorias/", categoriaRoutes)
})


app.listen(PORT,()=>{
    console.log(`Servidor iniciado correctamente en el puerto: ${PORT}`)
})