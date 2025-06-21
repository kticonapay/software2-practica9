import mongoose from "mongoose";

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(process.env.MONGO_URI)
        console.log(`BD conectada en host = ${db.connection.host} y puerto = ${db.connection.port}`)
    } catch (error) {
        console.log(error.message)
    }
}
export default conectarDB

