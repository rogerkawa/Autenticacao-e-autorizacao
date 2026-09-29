import mysql from 'mysql2/promise'
import 'dotenv/config'

const conect = mysql.createPool({
    host: 'localhost',
    user: 'root',
    database: 'cadastro',
    password:'Pcmskexr123',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})

export default conect