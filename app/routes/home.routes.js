import { Router } from "express";
import { homeController } from "../controllers/home.controller.js";
const home = Router();

// Vista principal de la pagina
home.get("/", homeController.index);

// vista para la pagina por genero
home.get("/genero", homeController.genero);

export default home;
