import nodemailer from "nodemailer"

const emailRegistro = async (datos)=>{
    const { EMAIL_HOST , EMAIL_PORT, EMAIL_USER, EMAIL_PASS} = process.env
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USER,
            pass: EMAIL_PASS
        }
    });


    // Enviar email
    const {email, nombre, token} = datos

    const info = await transporter.sendMail({
        from:"veterinaria@patitas.com",
        to: email,
        subject: `Hola ${nombre} !, Confirma tu cuenta`,
        text:"Tan sencillo como siempre",
        html:`<p>Dale click al siguiente enlace para confirmar tu cuenta</p>
            <a href="${process.env.FRONTEND_URL}/confirmar-cuenta/${token}">Confirmar Cuenta</a>
            <strong>Si tu no creaste esta cuenta, ignora este mensaje</strong>    
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRegistro