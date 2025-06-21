import clienteAxios from "../config/axios.jsx";

export default class CategoriaService {
    #token
    #url

    constructor() {
        this.#token = localStorage.getItem("token") ?? null
        this.#url = "/api/categorias"
    }

    async obtenerCategorias() {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.#token}`
            }
        }
        return clienteAxios(this.#url, config)
    }
}
