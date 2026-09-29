async function verifyResponse(response) {
    if(!response.ok){
        const erro = await response.json()

        throw new Error(erro.message || `erro HTTP: ${response.status}`)
    }

    return response
}

const url_base = 'http://localhost:3333/users'

function obterToken(){
    return localStorage.getItem('token')
}

function httpAuth(){
    const token = obterToken()

    return {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    }
}

function httpHeader(){
    return {
        'Content-Type': 'application/json',
    }
}


const app = {
    async listUsers() {
        try {
            const response = await fetch(`${url_base}`,{
            method: 'GET',
            headers: httpAuth()
        })

        await verifyResponse(response)
        return response.json()

        } catch (error) {
            console.error(error)
            throw error
        }
    },

    async registerUser(register){
        try {
            const response = await fetch(`${url_base}/registro`,{
                method: 'POST',
                headers: httpHeader(),
                body: JSON.stringify(register)
            })

            await verifyResponse(response)
            return response.json()

        } catch (error) {
            console.error(error)
            throw error
        }
    },


    async loginUser(login){
        try {
            const response = await fetch(`${url_base}/login`,{
                method: 'POST',
                headers: httpHeader(),
                body: JSON.stringify(login)
            })

            await verifyResponse(response)
            return response.json()
        } catch (error) {
            console.error(error)
            throw error
        }
    },
    async findUserAuthenticator() {
    try {

        const response = await fetch(`${url_base}/login/auth`, {
            method: 'GET',
            headers: httpAuth()
        })

        await verifyResponse(response)

        return response.json()

    } catch (error) {
        console.error(error)
        throw error
    }
}
}


export default app

