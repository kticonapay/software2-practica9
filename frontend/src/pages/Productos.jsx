import TablaPersonalizada from "../components/TablaPersonalizada.jsx";
import {
    Box,
    Button,
    FormControl,
    FormControlLabel,
    FormLabel,
    InputLabel,
    MenuItem,
    Modal,
    Pagination,
    Popover,
    Radio,
    RadioGroup,
    Select,
    TextField,
    Typography
} from "@mui/material";
import * as React from "react";
import {useEffect, useState} from "react";
import ProductoService from "../services/productoService.js";
import Alerta from "../components/Alerta.jsx";
import titleCase from "../helpers/titleCase.js";
import ProductoSnackBar from "../components/ProductoSnackBar.jsx";
import CategoriaService from "../services/categoriaService.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};
export default function Productos() {
    const [productos, setProductos] = useState([]);
    const [estadoProductos, setEstadoProductos] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [categorias, setCategorias] = useState([]);
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipoMascota, setTipoMascota] = useState("");
    const [imagen, setImagen] = useState(null);
    const [nombreBotonImagen, setNombreBotonImagen] = useState("Seleccionar Imagen")
    const [mensajeSnackbar, setMensajeSnackbar] = useState("");
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const categoriaService = new CategoriaService()
    const productoService = new ProductoService()
    const [totalPaginas, setTotalPaginas] = useState(1);
    const [paginaActual, setPaginaActual] = useState(1);
    const [inicioIndice, setInicioIndice] = useState(1);
    const [anchorEl, setAnchorEl] = useState(null);
    const FILAS_POR_PAGINA = 5
    const [nombreFiltro, setNombreFiltro] = useState("")
    let categoriaFiltro = "", tipoMascotaFiltro = ""


    useEffect(() => {
        categoriaService.obtenerCategorias()
            .then(res => {
                setCategorias(res.data)
            })
            .catch(error => {
                setAlerta({msg: error.msg, error: true})
            })
    }, [])
    useEffect(() => {
        productoService.obtenerProductosPaginados(paginaActual, FILAS_POR_PAGINA)
            .then(res => {
                setTotalPaginas(res.data.paginas)
                setProductos(res.data.productos)
            })
            .catch(error => {
                setAlerta({msg: error.response.data.msg, error: true})
            })
    }, [estadoProductos]);
    const handleOpenModal = () => setOpenModal(true);
    const handleAggregate = async (e) => {
        e.preventDefault()
        if ([nombre, precio, descripcion, categoria, tipoMascota].includes("") || !imagen) {
            setAlerta({msg: "Todos los campos son obligatorios", error: true})
            return
        }
        try {
            const producto = {
                nombre,
                precio,
                descripcion,
                imagen,
                categoria,
                tipoMascota
            }
            const {data} = await productoService.agregarProducto(producto)

            setOpenModal(false)
            setEstadoProductos(!estadoProductos)
            setOpenSnackbar(true)
            setAlerta({})
            setNombreBotonImagen("Seleccionar Imagen")
            setMensajeSnackbar(`✅ ${data.msg}`)
            limpiarFormulario()
        } catch (error) {
            setOpenSnackbar(true)
            setMensajeSnackbar(`❌ ${error.response.data.msg}`)
        }
    }
    const handleClose = (event, reason) => {
        if (reason && reason === 'backdropClick') {
            return;
        }
        setOpenModal(false);
    };
    const handleChangefile = (e) => {
        setImagen(e.target.files[0])
        setNombreBotonImagen(e.target.files[0].name)
    }
    const limpiarFormulario = () => {
        setNombre("")
        setPrecio("")
        setDescripcion("")
        setImagen(null)
        setCategoria("")
        setTipoMascota("")
    }

    const handleChangePage = async (e, paginaSeleccionada) => {
        if (paginaActual === paginaSeleccionada) {
            return
        }
        try {
            const respuesta = await productoService
                .obtenerProductosFiltrados(paginaSeleccionada, FILAS_POR_PAGINA, nombreFiltro
                    , categoriaFiltro, tipoMascotaFiltro)
            setProductos(respuesta.data.productos)
            setPaginaActual(paginaSeleccionada)
            setInicioIndice(respuesta.data.inicioIndice + 1)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const handleSearchForAndFilter = async (e) => {
        e.preventDefault()
        try {
            const respuesta = await productoService
                .obtenerProductosFiltrados(1, FILAS_POR_PAGINA, nombreFiltro
                    , categoriaFiltro, tipoMascotaFiltro)
            setProductos(respuesta.data.productos)
            setTotalPaginas(respuesta.data.paginas)
            setInicioIndice(respuesta.data.inicioIndice + 1)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const handleOpenFilter = (e) => {
        setAnchorEl(e.currentTarget);
    }
    const handleFilter = async (e) => {
        const valor = e.target.value
        if(valor === "PERRO" || valor === "GATO"){
            tipoMascotaFiltro = valor
        }else{
            categoriaFiltro = valor
        }
        try {
            await handleSearchForAndFilter(e)
        } catch (error) {
            setAlerta({msg: error.response.data.msg, error: true})
        }
    }

    const openFilter = Boolean(anchorEl);

    return <>
        {alerta?.msg ? <Alerta alerta={{msg: "Error al listar todos los productos", error: true}}/> :
            <div className={"space-y-5 px-3"}>
                <header className={"flex justify-between items-center"}>
                    <div className={"flex flex-col lg:flex-row gap-5"}>
                        <Button variant="contained" disableElevation
                                onClick={handleOpenModal} className={"flex gap-x-2 items-center"}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" strokeLinecap="round"
                                 strokeLinejoin="round" width="18" height="18" strokeWidth="2">
                                <path d="M12 5l0 14"></path>
                                <path d="M5 12l14 0"></path>
                            </svg>
                            <Typography>Agregar Producto</Typography>
                        </Button>
                        <form onSubmit={handleSearchForAndFilter} className={"flex items-center relative"}>
                            <TextField id="filled-basic" label="Buscar " variant="filled"
                                       onChange={(e) => setNombreFiltro(e.target.value) }/>
                            <button type={"submit"} className={"absolute right-5"}>
                                <svg xmlns="http://www.w3.org/2000/svg"
                                     viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                     strokeLinecap="round" strokeLinejoin="round" width="20" height="20"
                                     strokeWidth="2">
                                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                                    <path d="M21 21l-6 -6"></path>
                                </svg>
                            </button>
                        </form>
                    </div>
                    <Button variant="outlined"
                            sx={{height: "40px"}}
                            onClick={handleOpenFilter}>
                        <div className={"flex gap-3"}>
                            <svg xmlns="http://www.w3.org/2000/svg"
                                 viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                 strokeLinecap="round" strokeLinejoin="round" width="20" height="20"
                                 strokeWidth="2">
                                <path d="M4 8h4v4h-4z"></path>
                                <path d="M6 4l0 4"></path>
                                <path d="M6 12l0 8"></path>
                                <path d="M10 14h4v4h-4z"></path>
                                <path d="M12 4l0 10"></path>
                                <path d="M12 18l0 2"></path>
                                <path d="M16 5h4v4h-4z"></path>
                                <path d="M18 4l0 1"></path>
                                <path d="M18 9l0 11"></path>
                            </svg>
                            <Typography>Filtrar por</Typography>
                        </div>
                    </Button>
                    <Popover
                        id={"ga"}
                        open={openFilter}
                        anchorEl={anchorEl}
                        onClose={() => setAnchorEl(null)}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left',
                        }}
                    >
                        <div className={"p-5 space-x-2"}>
                            <FormControl>

                                <RadioGroup onChange={handleFilter}>
                                    <div className={"flex gap-5"}>
                                        <div className={"flex flex-col"}>
                                            <FormLabel>Categoria</FormLabel>
                                            {categorias.map((categoria, index) => {
                                                return <FormControlLabel key={index}
                                                                         value={categoria._id}
                                                                         control={<Radio/>}
                                                                         label={titleCase(categoria.nombre)}/>
                                            })}
                                        </div>
                                        <div className={"flex flex-col"}>
                                            <FormLabel>Tipo de mascota</FormLabel>
                                            <FormControlLabel value="PERRO" control={<Radio/>} label="Perro"/>
                                            <FormControlLabel value="GATO" control={<Radio/>} label="Gato"/>
                                        </div>
                                    </div>
                                </RadioGroup>
                            </FormControl>

                        </div>
                    </Popover>
                </header>
                <TablaPersonalizada productos={productos} inicioIndice={inicioIndice}
                                    estadoProductos={estadoProductos}
                                    setEstadoProductos={setEstadoProductos}/>
                <Modal
                    open={openModal}
                    onClose={handleClose}
                    disableEscapeKeyDown={true}
                >
                    <Box sx={style}>
                        {alerta?.msg && <Alerta alerta={alerta}/>}
                        <form onSubmit={handleAggregate} className={"space-y-10"} autoComplete={"off"}>
                            <legend>
                                <h1 className={"text-2xl font-semibold"}>
                                    Agregando un nuevo producto
                                </h1>
                            </legend>
                            <div className={"grid grid-cols-2 gap-5"}>
                                <TextField label="Nombre" variant="outlined"
                                           value={nombre}
                                           onChange={e => setNombre(e.target.value)}/>
                                <TextField label="Precio" variant="outlined"
                                           value={precio}
                                           onChange={e => setPrecio(e.target.value)}/>
                                <TextField label="Descripción"
                                           className={"col-span-2"} multiline rows={3}
                                           value={descripcion}
                                           onChange={e => setDescripcion(e.target.value)}/>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{backgroundColor: "black"}}
                                    className={"col-span-2"}
                                >
                                    {nombreBotonImagen}
                                    <input
                                        type="file"
                                        accept={"image/*"}
                                        onChange={handleChangefile}
                                        hidden
                                    />
                                </Button>
                                <FormControl fullWidth>
                                    <InputLabel id="categoria">Categoria</InputLabel>
                                    <Select
                                        labelId="categoria"
                                        label="Categoria"
                                        value={categoria}
                                        onChange={e => setCategoria(e.target.value)}
                                    >
                                        {categorias.map(categoria => {
                                            return <MenuItem key={categoria._id}
                                                             value={categoria._id}>
                                                {titleCase(categoria.nombre)}
                                            </MenuItem>
                                        })}
                                    </Select>
                                </FormControl>
                                <FormControl fullWidth>
                                    <InputLabel id="tipoMascota">Tipo de Mascota</InputLabel>
                                    <Select
                                        labelId="tipoMascota"
                                        label="Tipo de Mascota"
                                        value={tipoMascota}
                                        onChange={e => setTipoMascota(e.target.value)}
                                    >
                                        <MenuItem value={"PERRO"}>Perro</MenuItem>
                                        <MenuItem value={"GATO"}>Gato</MenuItem>
                                        <MenuItem value={"AMBOS"}>Ambos</MenuItem>
                                    </Select>
                                </FormControl>
                            </div>
                            <div className={"flex gap-5 justify-end"}>
                                <Button type={"submit"} variant="contained" disableElevation
                                        className={"flex gap-x-2 items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         width="18" height="18" strokeWidth="2">
                                        <path
                                            d="M6 4h10l4 4v10a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2v-12a2 2 0 0 1 2 -2"></path>
                                        <path d="M12 14m-2 0a2 2 0 1 0 4 0a2 2 0 1 0 -4 0"></path>
                                        <path d="M14 4l0 4l-6 0l0 -4"></path>
                                    </svg>
                                    <Typography variant="body2">
                                        Agregar
                                    </Typography>
                                </Button>
                                <Button variant="contained" disableElevation
                                        style={{backgroundColor: "red"}} onClick={handleClose}
                                        className={"flex gap-x-2 items-center"}>
                                    <svg xmlns="http://www.w3.org/2000/svg"
                                         viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                         strokeLinecap="round" strokeLinejoin="round"
                                         width="18" height="18" strokeWidth="2">
                                        <path d="M3 12a9 9 0 1 0 18 0a9 9 0 1 0 -18 0"></path>
                                        <path d="M18.364 5.636l-12.728 12.728"></path>
                                    </svg>
                                    <Typography variant="body2">Cancelar</Typography>
                                </Button>
                            </div>
                        </form>
                    </Box>
                </Modal>
                <ProductoSnackBar open={openSnackbar}
                                  mensajeSnackbar={mensajeSnackbar} setOpenSnackbar={setOpenSnackbar}/>

                <Pagination count={totalPaginas} onChange={handleChangePage}/>
            </div>
        }
    </>
}