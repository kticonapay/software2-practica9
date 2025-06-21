function Alerta({alerta}) {
    return (
        <div className={`${alerta.error ? "bg-error":"bg-success"} text-center text-white
                p-3 rounded my-3`}>
            {alerta.msg}
        </div>
    );
}

export default Alerta;