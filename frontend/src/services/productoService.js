import clienteAxios from "../config/axios.jsx";

export default class ProductoService{
    #token
    #url
    constructor() {
        this.#token = localStorage.getItem("token") ?? null
        this.#url = "/api/productos"
    }
    async agregarProducto(producto) {
        const formData = new FormData()
        formData.append("nombre", producto.nombre)
        formData.append("precio", producto.precio)
        formData.append("descripcion", producto.descripcion)
        formData.append("imagen", producto.imagen)
        formData.append("categoria", producto.categoria)
        formData.append("tipoMascota", producto.tipoMascota)

        const config = {
            headers: {
                Authorization: `Bearer ${this.#token}`,
            },
        }
        return  clienteAxios.post(this.#url, formData, config)
    }
    async obtenerProductosPaginados(pagina, limite) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.#token}`
            }
        }
        return clienteAxios(`${this.#url}?pagina=${pagina}&limite=${limite}`, config);
    }
    async obtenerProductosFiltrados(pagina, limite, nombre, categoria, tipoMascota) {
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${this.#token}`
            }
        }

        return clienteAxios.post(`${this.#url}/filtrar?pagina=${pagina}&limite=${limite}`,
            {nombre, categoria, tipoMascota}, config);
    }
    async actualizarProducto(id,producto){
        const formData = new FormData()
        formData.append("nombre", producto.nombre)
        formData.append("precio", producto.precio)
        formData.append("descripcion", producto.descripcion)
        formData.append("imagen", producto.imagen)
        formData.append("categoria", producto.categoria)
        formData.append("tipoMascota", producto.tipoMascota)

        const config = {
            headers: {
                Authorization: `Bearer ${this.#token}`,
            },
        }
        return  clienteAxios.put(`${this.#url}/${id}`, formData, config)
    }
}
