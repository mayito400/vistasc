import { Router } from "express";
import { loginController } from "../controllers/login.controller.js";

const login = Router();

// Vista de inicio de sesion
login.get("/login", loginController.render);

// Vista de inicio de sesion
login.get("/logout", loginController.logout);

// Validacion de datos
login.post("/auth", loginController.authentication);

// Registro de usuarios
login.post("/regis", loginController.registro);

export default login;
