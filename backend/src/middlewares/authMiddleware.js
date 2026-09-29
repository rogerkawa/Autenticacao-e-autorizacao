import 'dotenv/config'
import jwt from 'jsonwebtoken'

function authMiddleware(req,res,next){

    //logica do middleware

    const authorization = req.headers.authorization

    if(!authorization){
        let message = 'Token inválido'
        return res.status(400).json(message)
    }

    try {
    const token = authorization.split(" ")[1]

    const payload = jwt.verify(token, process.env.JWT_SECRET)

    req.user = payload

    next()
    } catch (error) {
        console.error(error)
        return res.status(401).json({
            message: 'Token inválido.'
        })
    }
}

export default authMiddleware