import express from "express";
import UserController from "../controllers/userController";
import authMiddleware from "../middlewares/authMiddleware";

const userRoutes = express.Router()

    userRoutes.get('/users', UserController.listUsers)
    userRoutes.post('/users/registro', UserController.registerUser)
    userRoutes.post('/users/login', UserController.loginUser)
    userRoutes.get('/users/login/auth', authMiddleware, UserController.userAuthenticator)
    

export default userRoutes