import conect from "../config/database";

async function listUsers() {
    try {

        const sql = `
    SELECT * FROM Users
    `

    const [dados] = await conect.query(sql)
    return dados
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function registerUsers(
    nome,
    email,
    senha
) {
    try {
        const sql = `
    INSERT INTO Users(
    nome,
    email,
    senha
    )VALUES (?, ?, ?)
    `

    const [dados] = await conect.query(sql, [
    nome,
    email,
    senha
    ])

    return dados
    } catch (error) {
        console.log(error)
        throw error
    }
}

async function findEmail(email) {
    try {
        const sql = `
    SELECT * FROM Users WHERE email = ?
    `
    const [dados] = await conect.query(sql, [email])
    return dados[0]
    } catch (error) {
        console.log(error)
        throw error
    }
}

export default {listUsers, registerUsers, findEmail}