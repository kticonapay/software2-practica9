import {Snackbar} from "@mui/material";

export default function ProductoSnackBar({open, mensajeSnackbar, setOpenSnackbar}) {
    return <>
        <Snackbar
            open={open}
            autoHideDuration={2000}
            anchorOrigin={{vertical: "top", horizontal: "right"}}
            onClose={() => setOpenSnackbar(false)}
            message={mensajeSnackbar}
        />
    </>
}