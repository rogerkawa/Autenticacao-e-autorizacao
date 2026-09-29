import express from "express";
import 'dotenv/config'
import routes from "./routes";
import cors from 'cors'

const app = express()
app.use(cors())

routes(app)

const porta = process.env.PORT
const end = process.env.END

app.listen(porta, ()=> console.log(`Servidor rodando: ${end}:${porta}`))