import nodemailer from "nodemailer"

const emailRecuperarPassword = async (datos)=>{
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
        subject: `Hola ${nombre} !, Restablece tu contraseña`,
        text:"Tan sencillo como siempre",
        html:`<p>Dale click al siguiente enlace para restablecer tu contraseña</p>
            <a href="${process.env.FRONTEND_URL}/olvide-password/${token}">Confirmar Cuenta</a>
            <p>Si tu no creaste esta cuenta, ignora este mensaje</p>    
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

export default emailRecuperarPassword