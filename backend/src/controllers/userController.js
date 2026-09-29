import userModel from "../models/userModel";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
  static async listUsers(req, res) {
    try {
      const usersList = await userModel.listUsers();
      return res.status(200).json(usersList);
    } catch (error) {
      console.log(error);
      let message = "Erro interno no servidor";
      return res.status(500).json({ message });
    }
  }

  static async registerUser(req, res) {
    try {
      const { nome, email, senha } = req.body;

      //verificação de campos
      if (!nome || !email || !senha) {
        let message = "Todos os campos são obrigatórios.";
        return res.status(400).json({ message });
      }

      //verificação de email
      const userEmail = await userModel.findEmail(email);
      if (userEmail) {
        let message = "Usuário já existe!";
        return res.status(400).json({ message });
      }

      //criando proteção de senha
      const hash = await bcrypt.hash(senha, 10);

      //mandando dados pro banco
      await userModel.registerUsers(nome, email, hash);

      let message = "Usuário cadastrado com sucesso.";
      return res.status(201).json({ message });
    } catch (error) {
      console.log(error);
      let message = "Erro interno no servidor";
      return res.status(500).json(message);
    }
  }

  static async loginUser(req, res) {
    try {
      const { email, senha } = req.body;

      if (!email || !senha) {
        let message = "Todos os campos são obrigatórios.";
        return res.status(401).json({ message });
      }

      const user = await userModel.findEmail(email);

      if (!user) {
        let message = "E-mail ou senha incorretos.";
        return res.status(401).json({ message });
      }

      const comparaSenha = await bcrypt.compare(senha, user.senha);

      if (!comparaSenha) {
        let message = "E-mail ou senha incorretos.";
        return res.status(401).json({ message });
      }

      const token = jwt.sign(
        {
          id: user.id,
          email: user.email,
          role: user.role,
        },
        process.env.JWT_SECRET,
        { expiresIn: "1h" },
      );

      return res.status(200).json({
        message: "Login bem sucedido",
        token,
      });
    } catch (error) {
      let message = "Erro interno no servidor";
      return res.status(500).json({ message });
    }
  }

  static userAuthenticator(req, res) {
    try {
      return res.status(200).json({
        user: req.user,
      });
    } catch (error) {
      console.error(error);
      let message = "Erro de servidor!";
      return res.status(500).json({ message });
    }
  }
}

export default UserController;
