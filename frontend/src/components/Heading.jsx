export default function Heading({titulo, subtitulo}) {

    const particiones = subtitulo.split("-")

    return <div className={"py-8 "}>
        <h2 className={"font-black text-3xl text-center"}>{titulo}</h2>
        <p className={"text-xl mt-5 text-center"}>{particiones[0]} <span
            className={"text-[var(--color-primario)] font-bold"}>
                {particiones[1]}
                </span>
        </p>
    </div>
}