import * as React from 'react';
import {useEffect, useState} from 'react';
import {styled} from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, {tableCellClasses} from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import {Box, Button, FormControl, InputLabel, MenuItem, Modal, Select, TextField, Typography} from "@mui/material";
import Spinner from "./Spinner.jsx";
import titleCase from "../helpers/titleCase.js";
import clienteAxios from "../config/axios.jsx";
import ProductoSnackBar from "./ProductoSnackBar.jsx";
import mostrarConfirmacion from "../helpers/mostrarConfirmacion.js";
import Alerta from "./Alerta.jsx";
import CategoriaService from "../services/categoriaService.js";
import ProductoService from "../services/productoService.js";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({theme}) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({theme}) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

export default function TablaPersonalizada({productos, estadoProductos, setEstadoProductos, inicioIndice}) {
    const token = localStorage.getItem("token") ?? null
    const [openSnackbar, setOpenSnackbar] = useState(false)
    const [mensajeSnackbar, setMensajeSnackbar] = useState("")
    const [openModal, setOpenModal] = useState(false);
    const [alerta, setAlerta] = useState({});
    const [idProducto, setIdProducto] = useState("");
    const [nombre, setNombre] = useState("");
    const [precio, setPrecio] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [categoria, setCategoria] = useState("");
    const [tipoMascota, setTipoMascota] = useState("");
    const [imagen, setImagen] = useState(null);
    const [categorias, setCategorias] = useState([]);
    const categoriaService = new CategoriaService()
    const [nombreBotonImagen, setNombreBotonImagen] = useState("Seleccionar Imagen")
    const productoService = new ProductoService()
    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    let filas = productos

    useEffect(() => {
        categoriaService.obtenerCategorias()
            .then(res => {
                setCategorias(res.data)
            })
            .catch(error => {
                setAlerta({msg: error.msg, error: true})
            })
    }, [])
    const handleEdit = async (producto) => {
        setOpenModal(true)
        setIdProducto(producto._id)
        setNombre(producto.nombre)
        setPrecio(producto.precio)
        setDescripcion(producto.descripcion)
        console.log(producto)
        setCategoria(producto.categoria._id)
        setTipoMascota(producto.tipoMascota)

    }
    const handleDelete = async (id) => {
        const respueta = await mostrarConfirmacion()
        if (respueta.isConfirmed) {
            const url = `api/productos/${id}`
            try {
                const {data} = await clienteAxios.delete(url, config)
                setOpenSnackbar(true)
                setEstadoProductos(!estadoProductos)
                setMensajeSnackbar(`✅ ${data.msg}`)
            } catch (error) {
                setOpenSnackbar(true)
                setMensajeSnackbar(`❌ ${error.response.data.msg}`)
            }
        }
    }
    const handleUpdate = async (e) => {
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
            const {data} = await productoService.actualizarProducto(idProducto, producto)
            setOpenModal(false)
            setEstadoProductos(!estadoProductos)
            setOpenSnackbar(true)
            setAlerta({})
            setNombreBotonImagen("Seleccionar Imagen")
            setMensajeSnackbar(`✅ ${data.msg}`)
            limpiarFormulario()
        } catch (error) {
            console.log(error)
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
    return <>
        <TableContainer component={Paper}>
            <Table sx={{minWidth: 700}} aria-label="customized table">
                <TableHead>
                    <TableRow>
                        <StyledTableCell align="center">&nbsp;</StyledTableCell>
                        <StyledTableCell align="center">Nombre</StyledTableCell>
                        <StyledTableCell align="center">Precio</StyledTableCell>
                        <StyledTableCell align="center">Descripción</StyledTableCell>
                        <StyledTableCell align="center">Imagen</StyledTableCell>
                        <StyledTableCell align="center">Categoría</StyledTableCell>
                        <StyledTableCell align="center">Tipo de Mascota</StyledTableCell>
                        <StyledTableCell align="center">Acciones</StyledTableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {(filas.length === 0) ?
                        <StyledTableRow className={"py-5"}>
                            <StyledTableCell align="center" colSpan={8}>
                                <div className={"flex justify-center py-10"}>
                                    <Spinner/>
                                </div>
                            </StyledTableCell>
                        </StyledTableRow> :
                        filas.map((row, indice) => (
                            <StyledTableRow key={row._id}>
                                <StyledTableCell align="center">{inicioIndice + indice }</StyledTableCell>
                                <StyledTableCell align="center">{row.nombre}</StyledTableCell>
                                <StyledTableCell align="center">{row.precio}</StyledTableCell>
                                <StyledTableCell align="center">{row.descripcion}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <img src={`http://localhost:4000/uploads/${row.imagen}`}
                                         alt="producto" width={50} height={50} className={"mx-auto"}/>
                                </StyledTableCell>
                                <StyledTableCell align="center">{titleCase(row.categoria.nombre)}</StyledTableCell>
                                <StyledTableCell align="center">{row.tipoMascota}</StyledTableCell>
                                <StyledTableCell align="center">
                                    <div className={"flex gap-x-3 justify-evenly"}>
                                        <Button variant="contained" disableElevation
                                                onClick={() => handleEdit(row)}
                                                sx={{backgroundColor: "rgba(255,150,0,0.88)"}}
                                                className={"flex gap-x-2 items-center"}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor"
                                                 strokeLinecap="round" strokeLinejoin="round" width="18" height="18"
                                                 strokeWidth="2">
                                                <path
                                                    d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                                                <path d="M13.5 6.5l4 4"></path>
                                            </svg>
                                            <Typography>Editar</Typography>
                                        </Button>
                                        <Button variant="contained" disableElevation
                                                onClick={() => handleDelete(row._id)
                                                }
                                                sx={{backgroundColor: "red"}} className={"flex gap-x-2 items-center"}>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                 viewBox="0 0 24 24" fill="none"
                                                 stroke="currentColor"
                                                 strokeLinecap="round" strokeLinejoin="round" width="18" height="18"
                                                 strokeWidth="2">
                                                <path d="M4 7l16 0"></path>
                                                <path d="M10 11l0 6"></path>
                                                <path d="M14 11l0 6"></path>
                                                <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12"></path>
                                                <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3"></path>
                                            </svg>
                                            <Typography>Eliminar</Typography>
                                        </Button>
                                    </div>
                                </StyledTableCell>
                            </StyledTableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </TableContainer>
        <ProductoSnackBar open={openSnackbar}
                          mensajeSnackbar={mensajeSnackbar} setOpenSnackbar={setOpenSnackbar}/>
        <Modal
            open={openModal}
            onClose={handleClose}
            disableEscapeKeyDown={true}
        >
            <Box sx={style}>
                {alerta?.msg && <Alerta alerta={alerta}/>}
                <form onSubmit={handleUpdate} className={"space-y-10"} autoComplete={"off"}>
                    <legend>
                        <h1 className={"text-2xl font-semibold"}>
                            Actualizando producto
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
                                Actualizar
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
    </>
}
