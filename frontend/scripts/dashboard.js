import app from "./api.js"

const btn = document.getElementById('btn')


btn.addEventListener('click', ()=>{
    localStorage.removeItem('token')
    window.location.href = 'login.html'
})

document.addEventListener('DOMContentLoaded', () => {
    verificarUsuario()
})


async function verificarUsuario() {

    const token = localStorage.getItem('token')

    // Não possui token
    if (!token) {
        window.location.href = 'login.html'
        return
    }

    try {

        const result = await app.findUserAuthenticator()

        const user =  await result.user

        document.getElementById('email').innerText = user.email
        document.getElementById('role').innerText = user.role

    } catch (error) {

        console.error(error)
        console.error("ERRO NO DASHBOARD:", error)

        // Token inválido ou expirado
        localStorage.removeItem('token')
        window.location.href = 'login.html'
    }
}